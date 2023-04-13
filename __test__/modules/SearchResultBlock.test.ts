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

  it("has _rawLines", () => {
    const block = new SearchResultBlock(blockedLinesStr);
    expect(block).toHaveProperty("_rawLines", rawLines);
  });

  it("has rawLines", () => {
    const block = new SearchResultBlock(blockedLinesStr);
    expect(block).toHaveProperty("rawLines", rawLines);
  });
});
