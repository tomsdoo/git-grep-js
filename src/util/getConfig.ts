import { getConfigPath } from "./getConfigPath";
import { loadConfig } from "./loadConfig";

export async function getConfig<T = any>(): Promise<T | undefined> {
  return await loadConfig<T>(getConfigPath());
}
