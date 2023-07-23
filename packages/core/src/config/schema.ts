import * as Schema from "zod";
import { join } from "node:path";

export const Config = Schema.object({
  views: Schema.optional(Schema.string()).default("src/views"),
  entry: Schema.optional(Schema.string()).default("src/entry"),

  appDir: Schema.optional(Schema.string()).default("_app"),

  env: Schema.object({
    privatePrefix: Schema.string().default(""),
    dir: Schema.string().default(process.cwd()),
    publicPrefix: Schema.string().default("PUBLIC_"),
    schema: Schema.optional(Schema.string()).default("src/env"),
  }).default({}),

  output: Schema.optional(
    Schema.object({
      dir: Schema.optional(Schema.string()).default(".hono-mvc"),
      file: Schema.optional(Schema.string()).default("index.js"),
    })
  ).default({}),

  files: Schema.object({
    assets: Schema.string().default("static"),
    appTemplate: Schema.string().default(join("src", "app.html")),
    errorTemplate: Schema.string().default(join("src", "error.html")),
    serviceWorker: Schema.string().default(join("src", "service-worker")),
  }).default({}),

  paths: Schema.object({
    base: Schema.string().default(""),
    assets: Schema.string().default(""),
    relative: Schema.string().optional(),
  }).default({}),

  serviceWorker: Schema.object({
    register: Schema.boolean().default(true),
    files: Schema.function()
      .args(Schema.string())
      .returns(Schema.boolean())
      .default(() => (filename: string) => !/\.DS_Store/.test(filename)),
  }).default({}),
});

export type Config = Schema.infer<typeof Config>;
