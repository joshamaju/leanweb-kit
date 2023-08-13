import * as fs from "node:fs";
import { defaultErrorTemplate } from "../utils/error.js";
import { ValidatedConfig } from "./schema.js";

export function load_error_page(config: ValidatedConfig) {
  let { errorTemplate } = config.files;

  // Don't do this inside resolving the config, because that would mean
  // adding/removing error.html isn't detected and would require a restart.
  if (!fs.existsSync(config.files.errorTemplate)) {
    return defaultErrorTemplate;
  }

  return fs.readFileSync(errorTemplate, "utf-8");
}
