import { afterEach, describe, it, expect, jest } from "@jest/globals";
import { StructuredLine } from "@/modules/StructuredLine";

describe("StructuredLine", () => {
  let rawLine: string;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("has _rawLine", () => {
    rawLine = "src/sub/dir/file.ext-123-  const a = 1;";

    expect(new StructuredLine(rawLine)).toHaveProperty("_rawLine", rawLine);
  });

  it("has rawLine", () => {
    rawLine = "src/sub/dir/file.ext-123-  const a = 1;";

    expect(new StructuredLine(rawLine)).toHaveProperty("rawLine", rawLine);
  });

  describe("has _fileName", () => {
    it("ok if line number is between 2 hyphens", () => {
      rawLine = "src/sub/dir/file.ext-123-  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty(
        "_fileName",
        "src/sub/dir/file.ext"
      );
    });

    it("ok if line number is between 2 colons", () => {
      rawLine = "src/sub/dir/file.ext:123:  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty(
        "_fileName",
        "src/sub/dir/file.ext"
      );
    });
  });
});
