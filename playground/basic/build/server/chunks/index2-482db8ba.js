import { c as create_ssr_component, e as each, a as escape } from './ssr-10d0c201.js';

const dependencies = {
  "@barba/core": "^2.9.7",
  "@dogstudio/highway": "^2.2.1",
  "@hono/node-server": "^1.1.0",
  hono: "^3.3.1",
  svelte: "^4.0.5",
  zod: "^3.21.4"
};
const Main = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const deps = Object.keys(dependencies);
  return `<!DOCTYPE html> <html lang="en"><head><meta charset="utf-8"> <title>BarbaJS legacy example</title> <script type="module" crossorigin src="../../../../_app/immutable/index.bbdd9212.js"><\/script> <link rel="modulepreload" crossorigin href="../../../../_app/immutable/chunks/modulepreload-polyfill.3cfb730f.js"> <link rel="stylesheet" href="../../../../_app/immutable/assets/index.35259be7.css"></head> <body> <div data-router-wrapper><div data-router-view="page-a"><h1>Home</h1> <ul class="bg-red-400">${each(deps, (item) => {
    return `<li>${escape(item)}</li>`;
  })}</ul> <a href="/about" class="p">Go to about</a></div></div>         </body></html>`;
});

export { Main as default };
//# sourceMappingURL=index2-482db8ba.js.map
