import { ValidatedConfig } from "../../config/schema.js";

export function assets_base(config: ValidatedConfig) {
  return (config.paths.assets || config.paths.base || ".") + "/";
}
