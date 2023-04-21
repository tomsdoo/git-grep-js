import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { Utility } from "@/modules/Utility";
import { exec } from "child_process";

jest.mock("child_process", () => ({
  exec: jest.fn(
    (
      commandline: string,
      callback: (error: Error | null, stdout: string, stderr: string) => void
    ) => {
      if (commandline === "command fails") {
        callback(new Error("some error"), "", "some error");
      } else {
        callback(null, "success", "");
      }
    }
  ),
}));

describe("Utility", () => {
  let util: Utility;
  beforeEach(() => {
    util = new Utility();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("execute()", () => {
    it("success", async () => {
      expect(await util.execute("command succeeds")).toBe("success");
      expect(exec).toHaveBeenCalledTimes(1);
    });

    it("failure", async () => {
      await expect(util.execute("command fails")).rejects.toEqual(
        new Error("some error")
      );
      expect(exec).toHaveBeenCalledTimes(1);
    });
  });
});
