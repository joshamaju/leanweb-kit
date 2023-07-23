import { Config } from "../config/schema.js";
import { write_ambient } from "./write_ambient.js";
import { write_tsconfig } from "./write_tsconfig.js";

// Initialize SvelteKit's generated files.
export function init(config: Config, mode: string) {
  write_tsconfig(config);
  write_ambient(config, mode);
}
