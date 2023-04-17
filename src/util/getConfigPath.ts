import { cwd } from "process";
import { join } from "path";

export function getConfigPath(): string {
  return join(cwd(), "grep2json.config.js");
}
