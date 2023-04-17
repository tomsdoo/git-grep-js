import { afterEach, describe, it, expect, jest } from "@jest/globals";
import { getConfigPath } from "@/util/getConfigPath";
import { join } from "path";

jest.mock("process", () => ({
  cwd: jest.fn().mockImplementation(() => "mockedPath"),
}));

describe("getConfigPath()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("path is valid", () => {
    expect(getConfigPath()).toBe(join("mockedPath", "grep2json.config.js"));
  });
});
