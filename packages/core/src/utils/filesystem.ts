import * as fs from "node:fs";
import * as path from "node:path";
import { StatSyncFn } from "node:fs";

import * as IO from "fp-ts/lib/IOEither.js";
import { pipe } from "fp-ts/lib/function.js";

export function posixify(str: string) {
  return str.replace(/\\/g, "/");
}

// Prepend given path with `/@fs` prefix
export function to_fs(str: string) {
  str = posixify(str);
  return `/@fs${
    // Windows/Linux separation - Windows starts with a drive letter, we need a / in front there
    str.startsWith("/") ? "" : "/"
  }${str}`;
}

export function exists(path: string) {
  return pipe(
    IO.tryCatch(
      () => fs.accessSync(path, fs.constants.F_OK),
      (e) => e
    ),
    IO.match(
      () => false,
      () => true
    )
  );
}

export function stat(...args: Parameters<StatSyncFn>) {
  return IO.tryCatch(
    () => fs.statSync(...args),
    (e) => e as NodeJS.ErrnoException
  );
}

export function readdir(
  path: fs.PathLike,
  options?:
    | {
        encoding: BufferEncoding | null;
        withFileTypes?: false | undefined;
        recursive?: boolean | undefined;
      }
    | BufferEncoding
    | null
    | undefined
) {
  return IO.tryCatch(
    () => fs.readdirSync(path, options),
    (e) => e as NodeJS.ErrnoException
  );
}

export function mkdirp(dir: string) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e: any) {
    if (e.code === "EEXIST") {
      if (!fs.statSync(dir).isDirectory()) {
        throw new Error(
          `Cannot create directory ${dir}, a file already exists at this position`
        );
      }

      return;
    }

    throw e;
  }
}

export function rimraf(path: string) {
  fs.rmSync(path, { force: true, recursive: true });
}

export function copy(
  source: string,
  target: string,
  opts: {
    replace?: Record<string, string>;
    filter?: (basename: string) => boolean;
  } = {}
) {
  if (!fs.existsSync(source)) return [];

  const files: Array<string> = [];

  const prefix = posixify(target) + "/";

  const regex = opts.replace
    ? new RegExp(`\\b(${Object.keys(opts.replace).join("|")})\\b`, "g")
    : null;

  function go(from: string, to: string) {
    if (opts.filter && !opts.filter(path.basename(from))) return;

    const stats = fs.statSync(from);

    if (stats.isDirectory()) {
      fs.readdirSync(from).forEach((file) => {
        go(path.join(from, file), path.join(to, file));
      });
    } else {
      mkdirp(path.dirname(to));

      if (opts.replace) {
        const data = fs.readFileSync(from, "utf-8");
        fs.writeFileSync(
          to,
          data.replace(
            regex as RegExp,
            (_match, key) => (opts.replace as Record<string, string>)[key]
          )
        );
      } else {
        fs.copyFileSync(from, to);
      }

      files.push(
        to === target
          ? posixify(path.basename(to))
          : posixify(to).replace(prefix, "")
      );
    }
  }

  go(source, target);

  return files;
}
