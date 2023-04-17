import { stat } from "fs/promises";

export async function loadConfig<T = any>(
  configFileName: string
): Promise<T | undefined> {
  return await stat(configFileName)
    .then((file) => (file.isFile() ? require(configFileName) : undefined))
    .catch(() => undefined);
}
