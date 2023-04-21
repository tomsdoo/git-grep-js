import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { Utility } from "@/modules/Utility";

describe("Utility", () => {
  let util: Utility;
  beforeEach(() => {
    util = new Utility();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCurrentBranch()", () => {
    it("success", async () => {
      const spy = jest
        .spyOn(Utility.prototype, "execute")
        .mockResolvedValue(
          [
            `  feature/some    dummysha1 message1`,
            `* feature/current dummysha2 message2`,
            `  feature/another dummysha3 message3`,
          ].join("\n")
        );
      await expect(util.getCurrentBranch()).resolves.toEqual({
        name: "feature/current",
        sha: "dummysha2",
      });
      expect(spy).toHaveBeenCalledWith(`git branch -v`);
    });
  });
});
