import { Hono } from "hono";

import { render } from "core/runtime";

import home from "./views/home/home.html";
import about from "./views/about/index.html";
import main from "./views/main/index.html";

const app = new Hono();

app.get("/", (ctx) => ctx.html('Go to <a href="/about">About</a>'));

app.get("/main", async (ctx) => ctx.html(render(main, {})));

app.get("/home", async (ctx) => ctx.html(render(home, {})));

app.get("/about", async (ctx) => ctx.html(render(about, {})));

app.get("/sample", async (ctx) => {
  return ctx.html(render(about, {}));
});

export default app;
