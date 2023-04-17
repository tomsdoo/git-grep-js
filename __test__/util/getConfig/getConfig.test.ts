import { afterEach, describe, it, expect, jest } from "@jest/globals";
import { getConfigPath } from "@/util/getConfigPath";
import { loadConfig } from "@/util/loadConfig";
import { getConfig } from "@/util/getConfig";

jest.mock("@/util/getConfigPath", () => ({
  getConfigPath: jest.fn().mockImplementation(() => "mockedPath"),
}));

jest.mock("@/util/loadConfig", () => ({
  loadConfig: jest.fn().mockImplementation(() => ({ name: "dummy" })),
}));

describe("getConfig()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls loadConfig() and getConfigPath()", async () => {
    expect(await getConfig()).toEqual({
      name: "dummy",
    });
    expect(getConfigPath).toHaveBeenCalledTimes(1);
    expect(loadConfig).toHaveBeenCalledWith("mockedPath");
  });
});
