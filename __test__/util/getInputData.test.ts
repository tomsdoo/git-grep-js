import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { getInputData } from "@/util/getInputData";
import { Command } from "commander";

const mockedParse = jest.fn();
const mockedOpts = jest.fn(() => ({}));
jest.mock("commander", () => ({
  Command: jest.fn(() => ({
    parse: mockedParse,
    opts: mockedOpts,
  })),
}));

describe("getInputData()", () => {
  let isTTYExists: boolean;
  beforeEach(() => {
    isTTYExists = "isTTY" in process.stdin;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("isTTY == true", () => {
    beforeEach(() => {
      if (isTTYExists) {
        jest.replaceProperty(process.stdin, "isTTY", true);
      }
    });

    it("argv will be parsed", async () => {
      if (!isTTYExists) {
        return;
      }
      jest.replaceProperty(process, "argv", [
        `node`,
        `dummy.js`,
        `--init-config`,
      ]);
      expect(await getInputData(new Command())).toEqual({
        isTTY: true,
        opts: {},
        stdin: "",
      });
      expect(mockedParse).toHaveBeenCalledTimes(1);
      expect(mockedOpts).toHaveBeenCalledTimes(1);
    });
  });

  describe("isTTY == false", () => {
    beforeEach(() => {
      if (isTTYExists) {
        jest.replaceProperty(process.stdin, "isTTY", false);
      }
    });

    it("stdin will be passed", async () => {
      if (!isTTYExists) {
        return;
      }
      process.stdin.push("testData");
      process.stdin.push("testData2");
      process.stdin.emit("end");
      // eslint-disable-next-line  @typescript-eslint/no-floating-promises
      expect(getInputData(new Command())).resolves.toEqual({
        isTTY: false,
        opts: {},
        stdin: "testDatatestData2",
      });
      expect(mockedParse).toHaveBeenCalledTimes(0);
      expect(mockedOpts).toHaveBeenCalledTimes(0);
    });
  });
});
