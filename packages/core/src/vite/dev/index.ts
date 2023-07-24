import { Config } from "src/config/schema.js";
import { ResolvedConfig, ViteDevServer } from "vite";

import * as fs from "node:fs";
import * as path from "node:path";
import { URL } from "node:url";
import sirv from "sirv";
import { buildErrorMessage } from "vite";

import * as O from "fp-ts/lib/Option.js";

import { posixify, to_fs } from "../../utils/filesystem.js";
import { should_polyfill } from "../../utils/platform.js";
import { getRequest, setResponse } from "../node/index.js";
import { installPolyfills } from "../node/polyfills.js";
import * as sync from "../../sync/index.js";

import mime from "mime";

import { Server } from "connect";

import { Hono } from "hono";
import { resolve_entry } from "../utils/resolve_entry.js";

const script_file_regex = /\.(js|ts)$/;

const css_file_regex = /\.(css|scss)$/;

const cwd = process.cwd();

function is_script_request(url: string) {
  return script_file_regex.test(url);
}

function is_css_request(url: string) {
  return css_file_regex.test(url);
}

export async function dev(
  vite: ViteDevServer,
  vite_config: ResolvedConfig,
  config: Config
) {
  if (should_polyfill) {
    installPolyfills();
  }

  sync.init(config, vite_config.mode);

  async function loud_ssr_load_module(url: string) {
    try {
      return await vite.ssrLoadModule(url);
    } catch (err: any) {
      const msg = buildErrorMessage(err, [
        `Internal server error: ${err.message}`,
      ]);

      vite.config.logger.error(msg, { error: err });

      vite.ws.send({
        type: "error",
        err: {
          ...err,
          // these properties are non-enumerable and will
          // not be serialized unless we explicitly include them
          message: err.message,
          stack: err.stack,
        },
      });

      throw err;
    }
  }

  async function resolve(id: string) {
    const url = id.startsWith("..")
      ? `/@fs${path.posix.resolve(id)}`
      : `/${id}`;

    const module = await loud_ssr_load_module(url);

    const module_node = await vite.moduleGraph.getModuleByUrl(url);

    if (!module_node) throw new Error(`Could not find node for ${url}`);

    return { module, module_node, url };
  }

  //   async function update_manifest() {
  //     try {
  //       ({ manifest_data } = await sync.create(svelte_config));

  //       if (manifest_error) {
  //         manifest_error = null;
  //         vite.ws.send({ type: "full-reload" });
  //       }
  //     } catch (error) {
  //       manifest_error = /** @type {Error} */ error;

  //       console.error(colors.bold().red(manifest_error.message));
  //       vite.ws.send({
  //         type: "error",
  //         err: {
  //           message: manifest_error.message ?? "Invalid routes",
  //           stack: "",
  //         },
  //       });

  //       return;
  //     }

  //     manifest = {
  //       appDir: svelte_config.kit.appDir,
  //       appPath: svelte_config.kit.appDir,
  //       assets: new Set(manifest_data.assets.map((asset) => asset.file)),
  //       mimeTypes: get_mime_lookup(manifest_data),
  //       _: {
  //         client: {
  //           start: `${runtime_base}/client/start.js`,
  //           app: `${to_fs(svelte_config.kit.outDir)}/generated/client/app.js`,
  //           imports: [],
  //           stylesheets: [],
  //           fonts: [],
  //         },
  //         nodes: manifest_data.nodes.map((node, index) => {
  //           return async () => {
  //             /** @type {import('types').SSRNode} */
  //             const result = {};

  //             /** @type {import('vite').ModuleNode[]} */
  //             const module_nodes = [];

  //             result.index = index;

  //             // these are unused in dev, it's easier to include them
  //             result.imports = [];
  //             result.stylesheets = [];
  //             result.fonts = [];

  //             if (node.component) {
  //               result.component = async () => {
  //                 const { module_node, module } = await resolve(
  //                   /** @type {string} */ node.component
  //                 );

  //                 module_nodes.push(module_node);

  //                 return module.default;
  //               };
  //             }

  //             if (node.universal) {
  //               const { module, module_node } = await resolve(node.universal);

  //               module_nodes.push(module_node);

  //               result.universal = module;
  //               result.universal_id = node.universal;
  //             }

  //             if (node.server) {
  //               const { module } = await resolve(node.server);
  //               result.server = module;
  //               result.server_id = node.server;
  //             }

  //             // in dev we inline all styles to avoid FOUC. this gets populated lazily so that
  //             // components/stylesheets loaded via import() during `load` are included
  //             result.inline_styles = async () => {
  //               const deps = new Set();

  //               for (const module_node of module_nodes) {
  //                 await find_deps(vite, module_node, deps);
  //               }

  //               /** @type {Record<string, string>} */
  //               const styles = {};

  //               for (const dep of deps) {
  //                 const url = new URL(dep.url, "dummy:/");
  //                 const query = url.searchParams;

  //                 if (
  //                   (isCSSRequest(dep.file) ||
  //                     (query.has("svelte") && query.get("type") === "style")) &&
  //                   !(query.has("raw") || query.has("url") || query.has("inline"))
  //                 ) {
  //                   try {
  //                     query.set("inline", "");
  //                     const mod = await vite.ssrLoadModule(
  //                       `${decodeURI(url.pathname)}${url.search}${url.hash}`
  //                     );
  //                     styles[dep.url] = mod.default;
  //                   } catch {
  //                     // this can happen with dynamically imported modules, I think
  //                     // because the Vite module graph doesn't distinguish between
  //                     // static and dynamic imports? TODO investigate, submit fix
  //                   }
  //                 }
  //               }

  //               return styles;
  //             };

  //             return result;
  //           };
  //         }),
  //         routes: compact(
  //           manifest_data.routes.map((route) => {
  //             if (!route.page && !route.endpoint) return null;

  //             const endpoint = route.endpoint;

  //             return {
  //               id: route.id,
  //               pattern: route.pattern,
  //               params: route.params,
  //               page: route.page,
  //               endpoint: endpoint
  //                 ? async () => {
  //                     const url = path.resolve(cwd, endpoint.file);
  //                     return await loud_ssr_load_module(url);
  //                   }
  //                 : null,
  //               endpoint_id: endpoint?.file,
  //             };
  //           })
  //         ),
  //         matchers: async () => {
  //           /** @type {Record<string, import('@sveltejs/kit').ParamMatcher>} */
  //           const matchers = {};

  //           for (const key in manifest_data.matchers) {
  //             const file = manifest_data.matchers[key];
  //             const url = path.resolve(cwd, file);
  //             const module = await vite.ssrLoadModule(url);

  //             if (module.match) {
  //               matchers[key] = module.match;
  //             } else {
  //               throw new Error(`${file} does not export a \`match\` function`);
  //             }
  //           }

  //           return matchers;
  //         },
  //       },
  //     };
  //   }

  function fix_stack_trace(stack: string) {
    return stack ? vite.ssrRewriteStacktrace(stack) : stack;
  }

  //   await update_manifest();

  const watch = (event: string, cb: (file: string) => void) => {
    // vite.watcher.on(event, (file) => {
    //   if (
    //     file.startsWith(svelte_config.kit.files.routes + path.sep) ||
    //     file.startsWith(svelte_config.kit.files.params + path.sep) ||
    //     // in contrast to server hooks, client hooks are written to the client manifest
    //     // and therefore need rebuilding when they are added/removed
    //     file.startsWith(svelte_config.kit.files.hooks.client)
    //   ) {
    //     cb(file);
    //   }
    // });
  };

  let timeout: NodeJS.Timeout | null = null;

  const debounce = (to_run: () => void) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      to_run();
    }, 100);
  };

  // flag to skip watchers if server is already restarting
  let restarting = false;

  // Debounce add/unlink events because in case of folder deletion or moves
  // they fire in rapid succession, causing needless invocations.
  //   watch("add", () => debounce(update_manifest));
  //   watch("unlink", () => debounce(update_manifest));

  watch("change", (file) => {
    // Don't run for a single file if the whole manifest is about to get updated
    if (timeout || restarting) return;

    // sync.update(svelte_config, manifest_data, file);
  });

  //   const { appTemplate, errorTemplate, serviceWorker, hooks } =
  //     svelte_config.kit.files;

  // vite client only executes a full reload if the triggering html file path is index.html
  // kit defaults to src/app.html, so unless user changed that to index.html
  // send the vite client a full-reload event without path being set
  //   if (appTemplate !== "index.html") {
  //     vite.watcher.on("change", (file) => {
  //       if (file === appTemplate && !restarting) {
  //         vite.ws.send({ type: "full-reload" });
  //       }
  //     });
  //   }

  //   vite.watcher.on("all", (_, file) => {
  //     if (
  //       file === appTemplate ||
  //       file === errorTemplate ||
  //       file.startsWith(serviceWorker) ||
  //       file.startsWith(hooks.server)
  //     ) {
  //       sync.server(svelte_config);
  //     }
  //   });

  // changing the svelte config requires restarting the dev server
  // the config is only read on start and passed on to vite-plugin-svelte
  // which needs up-to-date values to operate correctly
  vite.watcher.on("change", (file) => {
    if (path.basename(file) === "svelte.config.js") {
      console.log(
        `svelte config changed, restarting vite dev-server. changed file: ${file}`
      );
      restarting = true;
      vite.restart();
    }
  });

  const asset_server = sirv(config.files.assets, {
    dev: true,
    etag: true,
    maxAge: 0,
    extensions: [],
    setHeaders: (res) => {
      res.setHeader("access-control-allow-origin", "*");
    },
  });

  const ws_send = vite.ws.send;

  vite.ws.send = function (...args: any) {
    return ws_send.apply(vite.ws, args);
  };

  vite.middlewares.use(async (req, res, next) => {
    try {
      const base = `${vite.config.server.https ? "https" : "http"}://${
        req.headers[":authority"] || req.headers.host
      }`;

      const decoded = decodeURI(new URL(base + req.url).pathname);

      const file = config.files.assets + decoded;

      if (fs.existsSync(file) && !fs.statSync(file).isDirectory()) {
        if (has_correct_case(file, config.files.assets)) {
          req.url = encodeURI(decoded); // don't need query/hash
          asset_server(req, res);
          return;
        }
      }

      next();
    } catch (e) {
      //   const error = coalesce_to_error(e);
      //   res.statusCode = 500;
      //   res.end(fix_stack_trace(/** @type {string} */ error.stack));
    }
  });

  //   const env = loadEnv(vite_config.mode, svelte_config.kit.env.dir, "");

  return () => {
    const serve_static_middleware = vite.middlewares.stack.find(
      (middleware) =>
        (middleware.handle as Function).name === "viteServeStaticMiddleware"
    );

    // Vite will give a 403 on URLs like /test, /static, and /package.json preventing us from
    // serving routes with those names. See https://github.com/vitejs/vite/issues/7363
    remove_static_middlewares(vite.middlewares);

    vite.middlewares.use(async (req, res) => {
      // Vite's base middleware strips out the base path. Restore it
      const original_url = req.url;
      req.url = req.originalUrl;

      try {
        const base = `${vite.config.server.https ? "https" : "http"}://${
          req.headers[":authority"] || req.headers.host
        }`;

        const decoded = decodeURI(new URL(base + req.url).pathname);

        console.log("decoded: ", decoded);

        // if (!decoded.startsWith(svelte_config.kit.paths.base)) {
        //   return not_found(req, res, svelte_config.kit.paths.base);
        // }

        const url = new URL(base + req.url);

        const source = url.searchParams.get("source");

        if (source) {
          const file = path.join(cwd, source);

          const is_file =
            fs.existsSync(file) && !fs.statSync(file).isDirectory();

          if (is_file) {
            if (is_script_request(file)) {
              res.writeHead(200, { "content-type": "application/javascript" });
              res.end(`import '${to_fs(file)}';`);
              return;
            }

            if (is_css_request(file)) {
              const resolved = await resolve(file);
              res.writeHead(200, { "content-type": "text/css" });
              res.end(resolved.module.default);
              return;
            }

            const contentType = mime.getType(file);

            if (contentType) {
              res.writeHead(200, { "content-type": contentType });
            }

            const contents = fs.createReadStream(file);

            contents.pipe(res);

            return;
          }
        }

        if (decoded === config.paths.base + "/service-worker.js") {
          const resolved = resolve_entry(config.files.serviceWorker)();

          if (O.isSome(resolved)) {
            res.writeHead(200, { "content-type": "application/javascript" });
            res.end(`import '${to_fs(resolved.value)}';`);
          } else {
            res.writeHead(404);
            res.end("not found");
          }

          return;
        }

        // we have to import `Server` before calling `set_assets`
        const module = await vite.ssrLoadModule(config.entry);

        const server = module.default as Hono;

        let request;

        try {
          request = await getRequest({ base, request: req });
        } catch (err: any) {
          res.statusCode = err.status || 400;
          return res.end("Invalid request body");
        }

        const rendered = await server.fetch(request);

        if (rendered.status === 404) {
          // @ts-expect-error
          serve_static_middleware.handle(req, res, () => {
            setResponse(res, rendered);
          });
        } else {
          setResponse(res, rendered);
        }
      } catch (e) {
        const error = coalesce_to_error(e);
        res.statusCode = 500;
        res.end(fix_stack_trace(error.stack!));
      }
    });
  };
}

function coalesce_to_error(err: unknown) {
  return err instanceof Error ||
    (err && (err as any).name && (err as any).message)
    ? (err as Error)
    : new Error(JSON.stringify(err));
}

function remove_static_middlewares(server: Server) {
  const static_middlewares = ["viteServeStaticMiddleware"];
  for (let i = server.stack.length - 1; i > 0; i--) {
    // @ts-expect-error using internals
    if (static_middlewares.includes(server.stack[i].handle.name)) {
      server.stack.splice(i, 1);
    }
  }
}

/**
 * Determine if a file is being requested with the correct case,
 * to ensure consistent behaviour between dev and prod and across
 * operating systems. Note that we can't use realpath here,
 * because we don't want to follow symlinks
 */
function has_correct_case(file: string, assets: string) {
  if (file === assets) return true;

  const parent = path.dirname(file);

  if (fs.readdirSync(parent).includes(path.basename(file))) {
    return has_correct_case(parent, assets);
  }

  return false;
}
