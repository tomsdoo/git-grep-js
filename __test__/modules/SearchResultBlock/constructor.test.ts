import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { SearchResultBlock } from "@/modules/SearchResultBlock";
import { StructuredLine } from "@/modules/StructuredLine";

jest.mock("@/modules/StructuredLine", () => ({
  StructuredLine: jest.fn().mockImplementation(() => ({})),
}));

describe("SearchResultBlock", () => {
  let rawLines: string[];
  let blockedLinesStr: string;
  beforeEach(() => {
    rawLines = [
      `src/sub/dir/1/file.ext-1-const a = 1;`,
      `src/sub/dir/1/file.ext-2-`,
      `src/sub/dir/1/file.ext:3:function testF(){`,
      `src/sub/dir/1/file.ext-4-  return a;`,
      `src/sub/dir/1/file.ext-5-}`,
    ];
    blockedLinesStr = rawLines.join("\n");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("has _rawLines", () => {
    it("no blank lines", () => {
      const block = new SearchResultBlock(blockedLinesStr);
      expect(block).toHaveProperty("_rawLines", rawLines);
    });

    it("with some blank lines", () => {
      const blockedLinesStrWithSomeBlankLines = rawLines
        .map((rawLine) => [rawLine, ""])
        .flat()
        .join("\n");
      const block = new SearchResultBlock(blockedLinesStrWithSomeBlankLines);
      expect(block).toHaveProperty("_rawLines", rawLines);
    });
  });

  it("has rawLines", () => {
    const block = new SearchResultBlock(blockedLinesStr);
    expect(block).toHaveProperty("rawLines", rawLines);
  });

  it("has _structuredLines", () => {
    const block = new SearchResultBlock(blockedLinesStr);
    expect(block).toHaveProperty("_structuredLines");
    expect(StructuredLine).toHaveBeenCalledTimes(5);
    expect(StructuredLine).toHaveBeenNthCalledWith(1, rawLines[0]);
    expect(StructuredLine).toHaveBeenNthCalledWith(2, rawLines[1]);
    expect(StructuredLine).toHaveBeenNthCalledWith(3, rawLines[2]);
    expect(StructuredLine).toHaveBeenNthCalledWith(4, rawLines[3]);
    expect(StructuredLine).toHaveBeenNthCalledWith(5, rawLines[4]);
  });

  it("has structuredLines", () => {
    const block = new SearchResultBlock(blockedLinesStr);
    expect(block).toHaveProperty("structuredLines");
    expect(StructuredLine).toHaveBeenCalledTimes(5);
    expect(StructuredLine).toHaveBeenNthCalledWith(1, rawLines[0]);
    expect(StructuredLine).toHaveBeenNthCalledWith(2, rawLines[1]);
    expect(StructuredLine).toHaveBeenNthCalledWith(3, rawLines[2]);
    expect(StructuredLine).toHaveBeenNthCalledWith(4, rawLines[3]);
    expect(StructuredLine).toHaveBeenNthCalledWith(5, rawLines[4]);
  });
});
