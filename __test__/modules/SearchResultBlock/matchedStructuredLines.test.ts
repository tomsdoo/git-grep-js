import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { SearchResultBlock } from "@/modules/SearchResultBlock";

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

  describe("has matchedStructuredLines", () => {
    it("has length 1", () => {
      const block = new SearchResultBlock(blockedLinesStr);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[0], "matched", "get")
        .mockReturnValue(false);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[1], "matched", "get")
        .mockReturnValue(false);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[2], "matched", "get")
        .mockReturnValue(false);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[3], "matched", "get")
        .mockReturnValue(true);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[4], "matched", "get")
        .mockReturnValue(false);

      expect(block.matchedStructuredLines).toHaveLength(1);
    });

    it("has length 2", () => {
      const block = new SearchResultBlock(blockedLinesStr);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[0], "matched", "get")
        .mockReturnValue(false);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[1], "matched", "get")
        .mockReturnValue(true);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[2], "matched", "get")
        .mockReturnValue(false);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[3], "matched", "get")
        .mockReturnValue(true);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[4], "matched", "get")
        .mockReturnValue(false);

      expect(block.matchedStructuredLines).toHaveLength(2);
    });

    it("has length 5", () => {
      const block = new SearchResultBlock(blockedLinesStr);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[0], "matched", "get")
        .mockReturnValue(true);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[1], "matched", "get")
        .mockReturnValue(true);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[2], "matched", "get")
        .mockReturnValue(true);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[3], "matched", "get")
        .mockReturnValue(true);
      // @ts-expect-error ignore accessibility: protected
      jest
        .spyOn(block._structuredLines[4], "matched", "get")
        .mockReturnValue(true);

      expect(block.matchedStructuredLines).toHaveLength(5);
    });
  });
});
