import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import * as url from "node:url";
import * as path from "node:path";

import home from "./views/home.html";

import { render } from "core/runtime";

import { PUBLIC_API_KEY } from "$env/static/public";

const app = new Hono();

const dir = path.dirname(url.fileURLToPath(import.meta.url));

console.log("api key: ", PUBLIC_API_KEY);

// app.use(
//   "/immutable/*",
//   serveStatic({
//     root: path.relative(process.cwd(), path.resolve(dir, "../client")),
//   })
// );

app.use(
  "/*",
  serveStatic({
    root: "./static",
  })
);

app.use(
  "/*",
  serveStatic({
    root: "./static/client",
  })
);

app.get("/", (ctx) => ctx.html('Go to <a href="/about">About</a>'));
app.get("/about", (ctx) => ctx.html(render(home, {})));

export default app;
