import { afterEach, describe, it, expect, jest } from "@jest/globals";
import { loadConfig } from "@/util/loadConfig";
import { join } from "path";

describe("loadConfig()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("undefined if provided path is a directory", async () => {
    expect(await loadConfig(join(__dirname, "../"))).toBe(undefined);
  });

  it("config object if provided path is a valid file", async () => {
    expect(await loadConfig(join(__dirname, "./mockedConfig.js"))).toEqual({
      name: "test",
    });
  });

  it("undefined if provided path is an invalid file", async () => {
    expect(await loadConfig(join(__dirname, "mockedInvalidConfig.js"))).toBe(
      undefined
    );
  });

  it("undefined if provided path does not exist", async () => {
    expect(await loadConfig(join(__dirname, "configExistNot.js"))).toBe(
      undefined
    );
  });
});
