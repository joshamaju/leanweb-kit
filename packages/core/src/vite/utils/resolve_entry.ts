import * as path from "node:path";

import * as IO from "fp-ts/lib/IO.js";
import * as O from "fp-ts/lib/Option.js";
import * as RA from "fp-ts/lib/ReadonlyArray.js";
import * as Bool from "fp-ts/lib/boolean.js";
import { pipe } from "fp-ts/lib/function.js";

import { exists, readdir, stat } from "../../utils/filesystem.js";

export function resolve_entry(entry: string): IO.IO<O.Option<string>> {
  return pipe(
    exists(entry),
    IO.chain(
      Bool.match(
        function notFound() {
          const dir = path.dirname(entry);
          return pipe(
            exists(dir),
            IO.chain(
              Bool.match(
                function notFound() {
                  return IO.of(O.none);
                },
                function found() {
                  const base = path.basename(entry);
                  return pipe(
                    readdir(dir),
                    IO.map(O.fromEither),
                    IO.map(
                      O.chain(
                        RA.findFirst(
                          (file) => file.replace(/\.[^.]+$/, "") === base
                        )
                      )
                    ),
                    IO.map(O.map((found) => path.join(dir, found)))
                  );
                }
              )
            )
          );
        },
        function found() {
          return pipe(
            stat(entry),
            IO.map(O.fromEither),
            IO.map(O.chain(O.fromNullable)),
            IO.chain(
              O.match(
                () => IO.of(O.none),
                (stat) => {
                  return stat.isDirectory()
                    ? resolve_entry(path.join(entry, "index"))
                    : IO.of(O.some(entry));
                }
              )
            )
          );
        }
      )
    )
  );
}
