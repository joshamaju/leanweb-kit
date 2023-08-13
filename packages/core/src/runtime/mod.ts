import { load } from "cheerio";
import { dedent } from "ts-dedent";

import { inspect } from "node:util";

import * as Effect from "@effect/io/Effect";
import * as Exit from "@effect/io/Exit";
import * as O from "@effect/data/Option";
import * as A from "@effect/data/ReadonlyArray";
import { pipe } from "@effect/data/Function";

import { views } from "__GENERATED__/views.js";
import { options } from "__GENERATED__/config.js";
import { VITE_CLIENT } from "../utils/constants.js";
import { runtimeErrorTemplate } from "../utils/error.js";

// export async function renderView(view: string, props: object = {}) {
//   const entries = [view, `${view}.html`, `${view}/index.html`];

//   const file = entries.find((_) => _ in views);

//   if (file) {
//     const component = await views[file]();

//     const ssr = component.render(props);

//     const document = load(ssr.html);

//     const head = document("head");

//     if (ssr.css.code) head.append(`<style>${ssr.css.code}</style>`);
//     if (ssr.head) head.append(head);

//     if (options.service_worker) {
//       const opts = __SVELTEKIT_DEV__ ? ", { type: 'module' }" : "";

//       document("body").append(dedent`<script>
//       if ('serviceWorker' in navigator) {
//         addEventListener('load', function() {
//           navigator.serviceWorker.register('service-worker.js'${opts});
//         });
//       }
//       </script>`);
//     }

//     return document.html();
//   }

//   const error_page = options.templates.error({ status: 500, message: "" });

//   return error_page;
// }

class ModuleLoadError {
  readonly _tag = "ModuleLoadError";
  constructor(readonly module: string) {}
}

const vite_client_regex =
  /<script type="module" src="\/@vite\/client"><\/script>/g;

// export async function render(view_name: string, props: object = {}) {
//   const possible_entries = [
//     view_name,
//     `${view_name}.html`,
//     `${view_name}/index.html`,
//   ];

//   const program = Effect.gen(function* (_) {
//     const module = yield* _(
//       A.findFirst(possible_entries, (_) => _ in views),
//       Effect.flatMap((entry) => {
//         return Effect.tryPromise({
//           try: () => views[entry](),
//           catch: (e) => (
//             console.log("module error", e),
//             new ModuleLoadError(
//               `Unable to load module ${entry} for ${view_name}`
//             )
//           ),
//         });
//       }),
//       Effect.exit
//     );

//     // console.log(module);

//     // views["home/index.html"]().catch((e) => console.log("err: ", e));

//     if (Exit.isFailure(module)) {
//       return options.templates.error({
//         status: 500,
//         message: "View not found",
//       });
//     }

//     const ssr = module.value.render(props);

//     const document = load(ssr.html);

//     const head = document("head");

//     if (ssr.css.code) head.append(`<style>${ssr.css.code}</style>`);

//     if (ssr.head) {
//       let new_head = ssr.head;

//       if (vite_client_regex.test(ssr.head)) {
//         new_head = new_head.replace(vite_client_regex, (_) => "");
//         new_head += '<script type="module" src="/@vite/client"></script>';
//       }

//       head.append(new_head);
//     }

//     if (options.service_worker) {
//       const opts = __SVELTEKIT_DEV__ ? ", { type: 'module' }" : "";

//       document("body").append(
//         dedent/* html */ `
//         <script>
//           if ('serviceWorker' in navigator) {
//             addEventListener('load', function() {
//               navigator.serviceWorker.register('service-worker.js'${opts});
//             });
//           }
//         </script>`
//       );
//     }

//     return document.html();
//     // return "";
//   });

//   const html = await Effect.runPromise(program);

//   return new Response(html, { headers: { "Content-Type": "text/html" } });
// }

class ModuleError {
  readonly _tag = "ModuleLoadError";
  constructor(
    readonly module: string,
    readonly reason: string,
    readonly originalError?: unknown,
  ) {}
}

export async function render(view_name: string, props: object = {}) {
  const possible_entries = [
    view_name,
    `${view_name}.html`,
    `${view_name}/index.html`,
  ];

  const { error } = options.templates;

  const program = pipe(
    A.findFirst(possible_entries, (_) => _ in views),
    Effect.flatMap((entry) => {
      return pipe(
        Effect.tryPromise({
          try: () => views[entry](),
          catch: (e) =>
            new ModuleError(
              entry,
              `Unable to load module ${entry} for ${view_name}`,
              e,
            ),
        }),
        Effect.bindTo("component"),
        Effect.bind("entry", () => Effect.succeed(entry)),
      );
    }),
    Effect.flatMap(({ entry, component }) => {
      return pipe(
        Effect.try({
          try: () => component.render(props),
          catch: (e) => new ModuleError(entry, `RenderError: ${view_name}`, e),
        }),
        Effect.map((rendered) => {
          const document = load(rendered.html);
          const head = document("head");

          if (rendered.css.code)
            head.append(`<style>${rendered.css.code}</style>`);

          if (rendered.head) {
            let new_head = rendered.head;

            if (__SVELTEKIT_DEV__) {
              // new_head = new_head.replace(vite_client_regex, (_) => "");
              new_head += '<script type="module" src="/@vite/client"></script>';
            }

            head.append(new_head);
          }

          if (options.service_worker) {
            const opts = __SVELTEKIT_DEV__ ? ", { type: 'module' }" : "";

            document("body").append(
              dedent/* html */ `
            <script>
              if ('serviceWorker' in navigator) {
                addEventListener('load', function() {
                  navigator.serviceWorker.register('service-worker.js'${opts});
                });
              }
            </script>`,
            );
          }

          return document.html();
        }),
      );
    }),
    Effect.catchTag("NoSuchElementException", (e) => {
      let html = error({ status: 404, message: e.message ?? "View not found" });

      if (__SVELTEKIT_DEV__) {
        const document = load(html);
        const head = document("head");
        head.append(VITE_CLIENT);
        html = document.html();
      }

      return Effect.succeed(html);
    }),
    Effect.catchTag("ModuleLoadError", (e) => {

      const err = e.originalError as Error;

      let html;

      if (__SVELTEKIT_DEV__) {
        html = runtimeErrorTemplate({
          file: e.module,
          stack: err.stack ?? "",
          message: err.message ?? e.reason,
        });
      } else {
        const template = error({
          status: 500,
          message: err.message ?? e.reason,
        });

        const document = load(template);
        const head = document("head");
        head.append(VITE_CLIENT);
        html = document.html();
      }

      return Effect.succeed(html);
    }),
  );

  const html = await Effect.runPromise(program);

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
