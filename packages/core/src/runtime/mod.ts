import { load } from "cheerio";
import { dedent } from "ts-dedent";

import * as A from "@effect/data/ReadonlyArray";
import * as Effect from "@effect/io/Effect";

import { options } from "__GENERATED__/config.js";
import { views } from "__GENERATED__/views.js";
import { VITE_CLIENT } from "../utils/constants.js";
import { coalesce_to_error, runtimeErrorTemplate } from "../utils/error.js";

class ModuleError {
  readonly _tag = "ModuleError";
  constructor(
    readonly module: string,
    readonly originalError: Error,
  ) {}
}

class RenderError {
  readonly _tag = "RenderError";
  constructor(
    readonly module: string,
    readonly originalError: Error,
  ) {}
}

const { error } = options.templates;

export async function renderToString(view: string, props: object = {}) {
  const program = Effect.gen(function* ($) {
    const entries = [
      view,
      `${view}.html`,
      `${view}/index.html`,
      `${view}.md.html`,
      `${view}/index.md.html`,
    ];

    const entry = yield* $(A.findFirst(entries, (entry) => entry in views));

    const component = yield* $(
      Effect.tryPromise({
        try: () => views[entry](),
        catch: (e) => new RenderError(entry, coalesce_to_error(e)),
      }),
    );

    const rendered = yield* $(
      Effect.try({
        try: () => component.render(props),
        catch: (e) => new RenderError(entry, coalesce_to_error(e)),
      }),
    );

    const document = load(rendered.html);
    const head = document("head");

    head.append(rendered.head)

    if (rendered.css.code) {
      head.append(`<style>${rendered.css.code}</style>`);
    }

    if (__LEANWEB_DEV__) {
      head.append(VITE_CLIENT);
    }

    if (options.service_worker) {
      const opts = __LEANWEB_DEV__ ? ", { type: 'module' }" : "";

      document("body").append(dedent`
        <script>
        if ('serviceWorker' in navigator) {
          addEventListener('load', function() {
            navigator.serviceWorker.register('service-worker.js'${opts});
          });
        }
        </script>`);
    }

    return document.html();
  }).pipe(
    Effect.catchTag("NoSuchElementException", (e) => {
      let html = error({
        status: 404,
        message: e.message ?? `View "${view}" not found in views directory`,
      });

      if (__LEANWEB_DEV__) {
        const document = load(html);
        document("head").append(VITE_CLIENT);
        html = document.html();
      }

      return Effect.succeed(html);
    }),
    Effect.catchTag("RenderError", (e) => {
      const err = e.originalError;
      const message = err.message;

      let html;

      if (__LEANWEB_DEV__) {
        html = runtimeErrorTemplate({
          ...e,
          message,
          file: e.module,
          stack: err.stack ?? "",
        });
      } else {
        const document = load(error({ status: 500, message }));
        document("head").append(VITE_CLIENT);
        html = document.html();
      }

      return Effect.succeed(html);
    }),
    // Effect.catchAll((e) => {
    //   console.log("catchAll: ", e);
    //   return Effect.fail(e);
    // }),
  );

  const html = await Effect.runPromise(program);

  return html
}

export async function render(view: string, props: object = {}) {
  const program = Effect.gen(function* ($) {
    const entries = [
      view,
      `${view}.html`,
      `${view}/index.html`,
      `${view}.md.html`,
      `${view}/index.md.html`,
    ];

    const entry = yield* $(A.findFirst(entries, (entry) => entry in views));

    const component = yield* $(
      Effect.tryPromise({
        try: () => views[entry](),
        catch: (e) => new RenderError(entry, coalesce_to_error(e)),
      }),
    );

    const rendered = yield* $(
      Effect.try({
        try: () => component.render(props),
        catch: (e) => new RenderError(entry, coalesce_to_error(e)),
      }),
    );

    const document = load(rendered.html);
    const head = document("head");

    head.append(rendered.head)

    if (rendered.css.code) {
      head.append(`<style>${rendered.css.code}</style>`);
    }

    if (__LEANWEB_DEV__) {
      head.append(VITE_CLIENT);
    }

    if (options.service_worker) {
      const opts = __LEANWEB_DEV__ ? ", { type: 'module' }" : "";

      document("body").append(dedent`
        <script>
        if ('serviceWorker' in navigator) {
          addEventListener('load', function() {
            navigator.serviceWorker.register('service-worker.js'${opts});
          });
        }
        </script>`);
    }

    return document.html();
  }).pipe(
    Effect.catchTag("NoSuchElementException", (e) => {
      let html = error({
        status: 404,
        message: e.message ?? `View "${view}" not found in views directory`,
      });

      if (__LEANWEB_DEV__) {
        const document = load(html);
        document("head").append(VITE_CLIENT);
        html = document.html();
      }

      return Effect.succeed(html);
    }),
    Effect.catchTag("RenderError", (e) => {
      const err = e.originalError;
      const message = err.message;

      let html;

      if (__LEANWEB_DEV__) {
        html = runtimeErrorTemplate({
          ...e,
          message,
          file: e.module,
          stack: err.stack ?? "",
        });
      } else {
        const document = load(error({ status: 500, message }));
        document("head").append(VITE_CLIENT);
        html = document.html();
      }

      return Effect.succeed(html);
    }),
    // Effect.catchAll((e) => {
    //   console.log("catchAll: ", e);
    //   return Effect.fail(e);
    // }),
  );

  const html = await Effect.runPromise(program);

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
