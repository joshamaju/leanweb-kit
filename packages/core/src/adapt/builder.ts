import {
  createReadStream,
  createWriteStream,
  existsSync,
  statSync,
} from "node:fs";
import { join } from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import * as zlib from "node:zlib";

import { ValidatedConfig } from "../config/schema.js";
import { BuildData, Builder, Logger } from "../types/internal.js";
import { copy, mkdirp, rimraf } from "../utils/filesystem.js";

const pipe = promisify(pipeline);

const extensions = [
  ".html",
  ".js",
  ".mjs",
  ".json",
  ".css",
  ".svg",
  ".xml",
  ".wasm",
];

export function create_builder({
  log,
  config,
  build_data,
}: {
  log: Logger;
  build_data: BuildData;
  config: ValidatedConfig;
}): Builder {
  return {
    log,
    copy,
    rimraf,
    mkdirp,

    config,

    async compress(directory) {
      if (!existsSync(directory)) {
        return;
      }

      //   const files = list_files(directory, (file) =>
      //     extensions.includes(extname(file))
      //   ).map((file) => resolve(directory, file));

      //   await Promise.all(
      //     files.flatMap((file) => [
      //       compress_file(file, "gz"),
      //       compress_file(file, "br"),
      //     ])
      //   );
    },

    generateManifest: ({ relativePath }) => {
      //   return generate_manifest({
      //     build_data,
      //     relative_path: relativePath,
      //     routes: subset
      //       ? subset.map((route) =>
      //           /** @type {import('types').RouteData} */ lookup.get(route)
      //         )
      //       : route_data.filter((route) => prerender_map.get(route.id) !== true),
      //   });

      return "";
    },

    getBuildDirectory(name) {
      return `${config.outDir}/${name}`;
    },

    getClientDirectory() {
      return `${config.outDir}/output/client`;
    },

    getServerDirectory() {
      return `${config.outDir}/output/server`;
    },

    getAppPath() {
      return build_data.app_path;
    },

    writeClient(dest) {
      //   const server_assets = copy(
      //     `${config.outDir}/output/server/${config.appDir}/immutable/assets`,
      //     join(dest, config.appDir, "immutable/assets")
      //   ).map((filename) => join(config.appDir, "immutable/assets", filename));

      const client_assets = copy(`${config.outDir}/output/client`, dest);

      //   return Array.from(new Set([...server_assets, ...client_assets]));

      // const client_assets = copy(
      //   `${config.outDir}/output/client/${config.appDir}/immutable/assets`,
      //   join(dest, config.appDir, "immutable/assets")
      // ).map((filename) => join(config.appDir, "immutable/assets", filename));

      return Array.from(new Set(client_assets));
    },

    writeServer(dest) {
      return copy(`${config.outDir}/output/server`, dest);
    },
  };
}

async function compress_file(file: string, format: "gz" | "br" = "gz") {
  const compress =
    format == "br"
      ? zlib.createBrotliCompress({
          params: {
            [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
            [zlib.constants.BROTLI_PARAM_QUALITY]:
              zlib.constants.BROTLI_MAX_QUALITY,
            [zlib.constants.BROTLI_PARAM_SIZE_HINT]: statSync(file).size,
          },
        })
      : zlib.createGzip({ level: zlib.constants.Z_BEST_COMPRESSION });

  const source = createReadStream(file);
  const destination = createWriteStream(`${file}.${format}`);

  await pipe(source, compress, destination);
}
