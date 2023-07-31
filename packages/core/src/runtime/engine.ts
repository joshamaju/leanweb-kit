import { load } from "cheerio";
import { dedent } from "ts-dedent";

import { options, views } from "__SERVER__/internal.js";

export async function renderView(view: string, props: object = {}) {
  const entries = [view, `${view}.html`, `${view}/index.html`];

  const file = entries.find((_) => _ in views);

  if (file) {
    const component = await views[file]();

    const ssr = component.render(props);
    const document = load(ssr.html);

    const head = document("head");

    if (ssr.css.code) head.append(`<style>${ssr.css.code}</style>`);
    if (ssr.head) head.append(head);

    if (options.service_worker) {
      const opts = __SVELTEKIT_DEV__ ? ", { type: 'module' }" : "";

      document("body").append(dedent`<script>
      if ('serviceWorker' in navigator) {
        addEventListener('load', function() {
          navigator.serviceWorker.register('service-worker.js'${opts});
        });
      }
      </script>`);
    }

    return document.html();
  }

  const error_page = options.templates.error({ status: 500, message: "" });

  return error_page;
}
