import type { ResolvedConfig, ViteDevServer } from "vite";
import { buildErrorMessage } from "vite";
import { ValidatedConfig } from "../../config/schema.js";

import color from "kleur";
import * as fs from "node:fs";
import * as path from "node:path";
import { URL } from "node:url";
import sirv from "sirv";

import { Server } from "connect";
import mime from "mime";

import { Hono } from "hono";

import * as O from "@effect/data/Option";
import * as Effect from "@effect/io/Effect";

import * as sync from "../../sync/index.js";
import { to_fs } from "../../utils/filesystem.js";
import { should_polyfill } from "../../utils/platform.js";
import { resolveEntry } from "../../utils/utils.js";
import { getRequest, setResponse } from "../../node/index.js";
import { installPolyfills } from "../../node/polyfills.js";

import { coalesce_to_error } from "../../utils/error.js";

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
  config: ValidatedConfig
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

  async function update_manifest() {
    try {
      // manifest = sync.create(config);

      sync.create(config);

      // if (manifest_error) {
      //   manifest_error = null;
      //   vite.ws.send({ type: "full-reload" });
      // }
    } catch (error: any) {
      // manifest_error = /** @type {Error} */ error;

      console.error(color.bold().red(error.message));

      vite.ws.send({
        type: "error",
        err: { message: "Invalid routes", stack: "" },
      });

      return;
    }
  }

  function fix_stack_trace(stack: string) {
    return stack ? vite.ssrRewriteStacktrace(stack) : stack;
  }

  await update_manifest();

  const watch = (event: string, cb: (file: string) => void) => {
    vite.watcher.on(event, (file) => {
      if (file.startsWith(config.files.views + path.sep)) {
        cb(file);
      }
    });
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
  watch("add", () => debounce(update_manifest));
  watch("unlink", () => debounce(update_manifest));

  // watch("change", (file) => {
  //   // Don't run for a single file if the whole manifest is about to get updated
  //   if (timeout || restarting) return;

  //   // sync.update(svelte_config, manifest_data, file);
  // });

  const { serviceWorker } = config.files;

  // vite client only executes a full reload if the triggering html file path is index.html
  // kit defaults to src/app.html, so unless user changed that to index.html
  // send the vite client a full-reload event without path being set
  //   if (appTemplate !== "index.html") {
  // vite.watcher.on("change", (file) => {
  //   if (file.startsWith(config.entry) && !restarting) {
  //     vite.ws.send({ type: "full-reload" });
  //   }
  // });
  //   }

  vite.watcher.on("all", (_, file) => {
    if (file.startsWith(serviceWorker)) {
      sync.config(config);
    }
  });

  // changing the svelte config requires restarting the dev server
  // the config is only read on start and passed on to vite-plugin-svelte
  // which needs up-to-date values to operate correctly
  // vite.watcher.on("change", (file) => {
  //   if (path.basename(file) === "svelte.config.js") {
  //     console.log(
  //       `svelte config changed, restarting vite dev-server. changed file: ${file}`
  //     );
  //     restarting = true;
  //     vite.restart();
  //   }
  // });

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
          req.url = encodeURI(decoded);
          asset_server(req, res);
          return;
        }
      }

      next();
    } catch (e) {
      const error = coalesce_to_error(e);
      res.statusCode = 500;
      res.end(fix_stack_trace(error.stack as string));
    }
  });

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

        console.log(decoded);

        if (!decoded.startsWith(config.paths.base)) {
          res.statusCode = 404;

          res.end(
            `The server is configured with a public base URL of ${base} - did you mean to visit ${
              base + req.url
            } instead?`
          );

          return;
        }

        const url = new URL(base + req.url);

        if (decoded === config.paths.base + "/service-worker.js") {
          const resolved = Effect.runSync(
            resolveEntry(config.files.serviceWorker)
          );

          if (O.isSome(resolved)) {
            res.writeHead(200, { "content-type": "application/javascript" });
            res.end(`import '${to_fs(resolved.value)}';`);
          } else {
            res.writeHead(404);
            res.end("not found");
          }

          return;
        }

        const source = url.searchParams.get("s");

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

        const module = await vite.ssrLoadModule(config.files.entry);

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
function has_correct_case(file: string, assets: string): boolean {
  if (file === assets) return true;

  const parent = path.dirname(file);

  if (fs.readdirSync(parent).includes(path.basename(file))) {
    return has_correct_case(parent, assets);
  }

  return false;
}
