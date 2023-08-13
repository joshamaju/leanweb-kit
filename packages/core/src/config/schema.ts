import * as S from "zod";
import { join } from "node:path";
import { Builder } from "../types/internal.js";

const Adapter = S.object({
  name: S.string(),
  adapt: S.function()
    .args(S.custom<Builder>())
    .returns(S.union([S.void(), S.promise(S.void())])),
});

export const Config = S.object({
  views: S.string().optional().default("src/views"),
  entry: S.string().optional().default("src/entry"),

  adapter: S.optional(Adapter),

  appDir: S.string().optional().default("_app"),

  outDir: S.string().optional().default(".hono-mvc"),

  env: S.object({
    privatePrefix: S.string().optional().default(""),
    schema: S.string().optional().default("src/env"),
    dir: S.string().optional().default(process.cwd()),
    publicPrefix: S.string().optional().default("PUBLIC_"),
  })
    .optional()
    .default({}),

  files: S.object({
    assets: S.string().optional().default("static"),
    appTemplate: S.string().optional().default(join("src", "app.html")),
    errorTemplate: S.string().optional().default(join("src", "error.html")),
    serviceWorker: S.string().optional().default(join("src", "service-worker")),
  })
    .optional()
    .default({}),

  paths: S.object({
    base: S.string().optional().default(""),
    assets: S.string().optional().default(""),
    // relative: S.string().optional(),
  })
    .optional()
    .default({}),

  serviceWorker: S.object({
    register: S.boolean().optional().default(true),
    files: S.function()
      .args(S.string())
      .returns(S.boolean())
      .optional()
      .default(() => (filename: string) => !/\.DS_Store/.test(filename)),
  })
    .optional()
    .default({}),
});

export type Config = S.input<typeof Config>;

export type Adapter = S.infer<typeof Adapter>;

export type ValidatedConfig = S.infer<typeof Config>;
