import * as path from "node:path";
import * as fs from "node:fs";
import { load_error_page } from "../config/load.js";
import { ValidatedConfig } from "../config/schema.js";
import { resolve_entry } from "../vite/utils/resolve_entry.js";
import { dedent } from "ts-dedent";

export async function write_server(
  output: string,
  views: string[],
  config: ValidatedConfig
) {
  const input = views.map((view) => {
    const file = path.resolve(config.views, view);
    const rel = path.relative(output, file);
    return `["${view}"]: async () => (await import('${rel}')).default`;
  });

  const has_service_worker =
    config.serviceWorker.register &&
    !!resolve_entry(config.files.serviceWorker);

  const error_page = load_error_page(config);

  fs.writeFileSync(
    `${output}/internal.js`,
    dedent`
    export const views = {\n${input.join(",\n")}\n};

    export const options = {
      service_worker: ${has_service_worker},
      env_public_prefix: '${config.env.publicPrefix}',
      templates: {
        error: ({ status, message }) => ${JSON.stringify(error_page)
          .replace(/%sveltekit\.status%/g, '" + status + "')
          .replace(/%sveltekit\.error\.message%/g, '" + message + "')}
	},
    };
    `
  );
}
