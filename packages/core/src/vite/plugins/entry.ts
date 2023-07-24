import type { InputOption } from "rollup";
import type {
  ConfigEnv,
  Plugin,
  ResolvedConfig,
  UserConfig,
  ViteDevServer,
} from "vite";
import * as vite from "vite";

import { compile } from "svelte/compiler";

import * as E from "fp-ts/lib/Either.js";
import * as O from "fp-ts/lib/Option.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import * as fs from "node:fs";
import * as path from "node:path";

import { glob } from "glob";
import { dedent } from "ts-dedent";
import mime from "mime";

import { transform } from "../../compiler/html/index.js";
import { Config, ValidatedConfig } from "../../config/schema.js";
import { mkdirp, rimraf } from "../../utils/filesystem.js";
import { dev } from "../dev/index.js";
import { resolve_entry } from "../utils/resolve_entry.js";
import { SvelteModifier } from "../utils/svelte_modifier.js";
import { get_env } from "../utils/env/load.js";
import { create_static_module } from "../utils/env/resolve.js";
import { assets_base } from "../utils/index.js";
import { Asset, BuildData, Env } from "../../types/internal.js";
import { build_service_worker } from "../build/service_worker.js";
import * as sync from "../../sync/index.js";

class ConfigParseError {
  readonly _tag = "ConfigParseError";
}

class HTMLTransformError {
  readonly _tag = "HTMLTransformError";
}

class NoEntryFileError {
  readonly _tag = "NoEntryFileError";
}

const html_file_regex = /\.html$/;

const html_postfix_regex = /[?#].*$/s;

const html_postfix = "?html-import";

const svelte_modifier = new SvelteModifier();

const cwd = process.cwd();

const s = JSON.stringify;

let build_step: "client" | "server";

let assets: Asset[];

export async function hono(user_config?: Config) {
  let vite_env: ConfigEnv;
  let vite_server: ViteDevServer;
  let cwd_vite_config: UserConfig;
  let vite_config: ResolvedConfig;

  let cwd_env: Env;

  const parsed_config = parse_config(user_config ?? ({} as Config));

  const config = pipe(parsed_config, E.map(resolve_config));

  if (E.isLeft(config)) {
    throw new Error("Invalid config");
  }

  const resolved_config = config.right;

  const entry = resolve_entry(resolved_config.entry)();

  const service_worker_entry_file = resolve_entry(
    resolved_config.files.serviceWorker
  )();

  if (O.isNone(entry)) {
    throw new NoEntryFileError();
  }

  const entry_file = entry.value;

  const out_dir = resolved_config.outDir;
  const views_dir = resolved_config.views;
  const out = `${resolved_config.outDir}/output`;

  const sourcemapIgnoreList = (relative_path: string) =>
    relative_path.includes("node_modules") || relative_path.includes(out_dir);

  const setup: Plugin = {
    name: "setup",
    configResolved(config) {
      vite_config = config;
    },
    configureServer(server) {
      vite_server = server;
      return dev(server, vite_config, resolved_config);
    },
    async config(config, config_env) {
      vite_env = config_env;
      cwd_vite_config = config;

      cwd_env = get_env(resolved_config.env, config_env.mode);

      let input: InputOption;

      if (config_env.command === "build" && build_step !== "server") {
        sync.init(resolved_config, config_env.mode);
        assets = await create_assets(resolved_config);
        const views = await glob("**/*.html", { cwd: views_dir });
        input = views.map((view) => path.resolve(views_dir, view));
      } else {
        input = { entry: entry_file };
      }

      // const prefix = "immutable";

      const prefix = `${resolved_config.appDir}/immutable`;

      const ssr = build_step === "server";
      const out_dir_ = `${out}/${ssr ? "server" : "client"}`;

      const is_build = config_env.command === "build";

      return {
        root: cwd,
        ssr: { noExternal: ["hono", "svelte"] },
        publicDir: resolved_config.files.assets,
        base: ssr ? assets_base(resolved_config) : "./",
        define: {
          __SVELTEKIT_DEV__: is_build ? "true" : "false",
        },
        server: {
          sourcemapIgnoreList,
        },
        worker: {
          rollupOptions: {
            output: {
              hoistTransitiveImports: false,
              entryFileNames: `${prefix}/workers/[name]-[hash].js`,
              chunkFileNames: `${prefix}/workers/chunks/[name]-[hash].js`,
              assetFileNames: `${prefix}/workers/assets/[name]-[hash][extname]`,
            },
          },
        },
        build: {
          ssr: true,
          outDir: out_dir_,
          ssrEmitAssets: true,
          copyPublicDir: !ssr,
          target: ssr ? "node16.14" : undefined,
          cssMinify:
            cwd_vite_config.build?.minify == null
              ? true
              : !!cwd_vite_config.build.minify,
          rollupOptions: {
            input,
            output: {
              format: "esm",
              sourcemapIgnoreList,
              hoistTransitiveImports: false,
              entryFileNames: ssr ? "[name].js" : `${prefix}/[name].[hash].js`,
              chunkFileNames: ssr
                ? "chunks/[name].js"
                : `${prefix}/chunks/[name].[hash].js`,
              assetFileNames: `${prefix}/assets/[name].[hash][extname]`,
            },
          },
        },
      };
    },
    buildStart() {
      if (build_step === "server") return;

      if (vite_env.command === "build") {
        if (!vite_config.build.watch) rimraf(out);
        mkdirp(out);
      }
    },
    async writeBundle() {
      if (build_step !== "server") {
        build_step = "server";

        const build_data: BuildData = {
          assets,
          app_dir: resolved_config.appDir,
          app_path: `${resolved_config.paths.base.slice(1)}${
            resolved_config.paths.base ? "/" : ""
          }${resolved_config.appDir}`,
          service_worker: service_worker_entry_file
            ? "service-worker.js"
            : null,
        };

        // Initiate second build step that builds the final server output
        await vite.build({
          mode: vite_env.mode,
          logLevel: vite_config.logLevel,
          configFile: vite_config.configFile,
          clearScreen: vite_config.clearScreen,
          optimizeDeps: {
            force: vite_config.optimizeDeps.force,
          },
          build: {
            minify: cwd_vite_config.build?.minify,
            sourcemap: vite_config.build.sourcemap,
            assetsInlineLimit: vite_config.build.assetsInlineLimit,
          },
        });

        if (O.isSome(service_worker_entry_file)) {
          if (resolved_config.paths.assets) {
            throw new Error(
              "Cannot use service worker alongside config.kit.paths.assets"
            );
          }

          console.info("Building service worker");

          mkdirp(`${out_dir}/generated`);

          await build_service_worker(
            out,
            resolved_config,
            vite_config,
            assets,
            service_worker_entry_file.value
          );
        }
      }
    },
  };

  const virtual_modules: Plugin = {
    name: "virtual-modules",

    async resolveId(id) {
      // treat $env/static/[public|private] as virtual
      if (
        id.startsWith("$env/") ||
        id.startsWith("__sveltekit/") ||
        id === "$service-worker"
      ) {
        return `\0${id}`;
      }
    },

    async load(id, options) {
      const browser = !options?.ssr;

      switch (id) {
        case "\0$env/static/private":
          return create_static_module("$env/static/private", cwd_env.private);

        case "\0$env/static/public":
          return create_static_module("$env/static/public", cwd_env.public);

        // case "\0$env/dynamic/private":
        //   return create_dynamic_module(
        //     "private",
        //     vite_config_env.command === "serve" ? env.private : undefined
        //   );

        // case "\0$env/dynamic/public":
        //   // populate `$env/dynamic/public` from `window`
        //   if (browser) {
        //     return `export const env = ${global}.env;`;
        //   }

        //   return create_dynamic_module(
        //     "public",
        //     vite_config_env.command === "serve" ? env.public : undefined
        //   );

        case "\0$service-worker":
          return await create_service_worker_module(resolved_config);

        // for internal use only. it's published as $app/paths externally
        // we use this alias so that we won't collide with user aliases
        case "\0__sveltekit/paths": {
          const { assets, base } = resolved_config.paths;

          // use the values defined in `global`, but fall back to hard-coded values
          // for the sake of things like Vitest which may import this module
          // outside the context of a page
          if (browser) {
            return dedent`
							export const base = ${global}?.base ?? ${s(base)};
							export const assets = ${global}?.assets ?? ${assets ? s(assets) : "base"};
						`;
          }

          return dedent`
						export let base = ${s(base)};
						export let assets = ${assets ? s(assets) : "base"};

						export const relative = ${resolved_config.paths.relative};

						const initial = { base, assets };

						export function override(paths) {
							base = paths.base;
							assets = paths.assets;
						}

						export function reset() {
							base = initial.base;
							assets = initial.assets;
						}

						/** @param {string} path */
						export function set_assets(path) {
							assets = initial.assets = path;
						}
					`;
        }

        // case "\0__sveltekit/environment": {
        //   const { version } = svelte_config.kit;

        //   return dedent`
        // 		export const version = ${s(version.name)};
        // 		export let building = false;

        // 		export function set_building() {
        // 			building = true;
        // 		}
        // 	`;
        // }
      }
    },
  };

  // Walk html file and attach the source file name for each asset in the html file, so that
  // we can accurately identify and serve them during dev
  const compile_dev: Plugin = {
    apply: "serve",
    name: "plugin-compile-dev",
    async transform(html, id) {
      if (html_file_regex.test(id)) {
        const no_svelte = svelte_modifier.strip(html, id);

        const program = pipe(
          transform(no_svelte, { cwd, filename: id }),
          TE.chainW((code) => {
            return TE.tryCatch(
              () => vite_server.transformIndexHtml(id, code),
              (e) => new HTMLTransformError()
            );
          }),
          TE.map((code) => svelte_modifier.restore(code, id)),
          TE.map((code) => compile(code, { generate: "ssr", filename: id }))
        );

        const result = await program();

        if (E.isLeft(result)) {
          throw result;
        }

        return result.right.js;
      }
    },
  };

  const resolve_build: Plugin = {
    apply: "build",
    enforce: "pre",
    name: "plugin-resolve-build",
    async resolveId(source, importer, options) {
      if (build_step === "server" && importer && html_file_regex.test(source)) {
        let res = await this.resolve(source, importer, {
          skipSelf: true,
          ...options,
        });

        if (!res || res.external) return res;

        const parsed = path.parse(importer);

        const views_out_dir = path.join(out, "client");

        /**
         * Given we've redirected imports to the client build output directory, we need
         * to then resolve an subsequent imports from files in that directory
         *
         * e.g given the following project structure
         * - root
         * ---- build
         * ---- src
         * ------ entry.ts // entry imports home
         * ------ views
         * -------- home.html // home imports footer
         * -------- footer.html
         *
         * We then compile the client and server outputs into the build folder. So initially
         * `home.html` is imported in `entry.ts` from `src/views/.../home.html` which we resolve down below (see RESOLVER) from `build/client/.../home.html`.
         *
         * Then `home.html` that was resolved from the `build` folder imports `build/client/.../footer.html`
         * which we then need to resolve from `build/client/.../footer.html`
         */
        if (importer.startsWith(views_out_dir)) {
          const resolved = path.resolve(parsed.dir, source);
          return resolved + html_postfix;
        }

        /**
         * [RESOLVER]
         *
         * Resolve html import from vite proceed html output
         *
         * To achieve that we reconstruct the actual equivalent file from the import file
         * url, point the import to the html file in the output directory
         */
        const resolved_view = path.join(
          views_out_dir,
          path.resolve(parsed.dir, source).substring(cwd.length)
        );

        return resolved_view + html_postfix;
      }
    },
    load(id) {
      if (!id.endsWith(html_postfix)) return;
      return fs.readFileSync(id.replace(html_postfix_regex, ""), "utf-8");
    },
    transform(code, id) {
      if (!id.endsWith(html_postfix)) return;
      const res = compile(code, { generate: "ssr", filename: id });
      return res.js;
    },
  };

  // Remove everything svelte before vite tries to transform the html file during production build
  const plugin_strip_svelte: Plugin = {
    apply: "build",
    name: "plugin-strip-svelte",
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        const code = svelte_modifier.strip(html, ctx.filename);
        return code;
      },
    },
  };

  // Restore everything svelte removed by the previous plugin so that we can compile to svelte components
  const plugin_restore_script: Plugin = {
    apply: "build",
    enforce: "post",
    name: "plugin-restore-svelte",
    transformIndexHtml(html, ctx) {
      return svelte_modifier.restore(html, ctx.filename);
    },
  };

  return [
    setup,
    compile_dev,
    resolve_build,
    plugin_strip_svelte,
    plugin_restore_script,
    virtual_modules,
  ];
}

function parse_config(config: Config) {
  const result = Config.safeParse(config);
  return result.success
    ? E.right(result.data as ValidatedConfig)
    : E.left(new ConfigParseError());
}

function resolve_config(config: ValidatedConfig) {
  const _config = { ...config };
  _config.entry = path.join(cwd, config.entry);
  _config.views = path.join(cwd, config.views);
  _config.outDir = path.join(cwd, config.outDir);
  return _config;
}

export async function create_assets(config: ValidatedConfig) {
  const files = await glob("**/*", { cwd: config.files.assets });

  return files.map((file) => {
    const _path = path.resolve(config.files.assets, file);
    return { file, type: mime.getType(file), size: fs.statSync(_path).size };
  });
}

async function create_service_worker_module(config: ValidatedConfig) {
  const assets = await create_assets(config);

  return dedent`
	if (typeof self === 'undefined' || self instanceof ServiceWorkerGlobalScope === false) {
		throw new Error('This module can only be imported inside a service worker');
	}

	export const build = [];
  
	export const files = [
		${assets
      .filter((asset) => config.serviceWorker.files(asset.file))
      .map((asset) => `${s(`${config.paths.base}/${asset.file}`)}`)
      .join(",\n")}
	];
`;
}
