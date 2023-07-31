import { ValidatedConfig } from "../config/schema.js";
import { write_ambient } from "./write_ambient.js";
import { write_server } from "./write_server.js";
import { write_tsconfig } from "./write_tsconfig.js";

// Initialize SvelteKit's generated files.
export function init(
  output: string,
  config: ValidatedConfig,
  views: string[],
  mode: string
) {
  write_tsconfig(config);
  write_ambient(config, mode);
  write_server(output, views, config);
}
