import { Config } from "../../config/schema.js";

export function assets_base(config: Config) {
  return (config.paths.assets || config.paths.base || ".") + "/";
}
