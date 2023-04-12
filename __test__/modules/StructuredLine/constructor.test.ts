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

  describe("has fileName", () => {
    it("ok if line number is between 2 hyphens", () => {
      rawLine = "src/sub/dir/file.ext-123-  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty(
        "fileName",
        "src/sub/dir/file.ext"
      );
    });

    it("ok if line number is between 2 colons", () => {
      rawLine = "src/sub/dir/file.ext:123:  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty(
        "fileName",
        "src/sub/dir/file.ext"
      );
    });
  });

  describe("has _matched", () => {
    it("false if line number is between 2 hyphens", () => {
      rawLine = "src/sub/dir/file.ext-123-  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty("_matched", false);
    });

    it("true if line number is between 2 colons", () => {
      rawLine = "src/sub/dir/file.ext:123:  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty("_matched", true);
    });
  });

  describe("has matched", () => {
    it("false if line number is between 2 hyphens", () => {
      rawLine = "src/sub/dir/file.ext-123-  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty("matched", false);
    });

    it("true if line number is between 2 colons", () => {
      rawLine = "src/sub/dir/file.ext:123:  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty("matched", true);
    });
  });

  describe("has _lineNumber", () => {
    it("ok if line number is between 2 hyphens", () => {
      rawLine = "src/sub/dir/file.ext-123-  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty("_lineNumber", 123);
    });

    it("ok if line number is between 2 colons", () => {
      rawLine = "src/sub/dir/file.ext:123:  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty("_lineNumber", 123);
    });
  });

  describe("has lineNumber", () => {
    it("ok if line number is between 2 hyphens", () => {
      rawLine = "src/sub/dir/file.ext-123-  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty("lineNumber", 123);
    });

    it("ok if line number is between 2 colons", () => {
      rawLine = "src/sub/dir/file.ext:123:  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty("lineNumber", 123);
    });
  });

  describe("has _codeLine", () => {
    it("ok if line number is between 2 hyphens", () => {
      rawLine = "src/sub/dir/file.ext-123-  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty(
        "_codeLine",
        "  const a = 1;"
      );
    });

    it("ok if line number is between 2 colons", () => {
      rawLine = "src/sub/dir/file.ext:123:  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty(
        "_codeLine",
        "  const a = 1;"
      );
    });
  });

  describe("has codeLine", () => {
    it("ok if line number is between 2 hyphens", () => {
      rawLine = "src/sub/dir/file.ext-123-  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty(
        "codeLine",
        "  const a = 1;"
      );
    });

    it("ok if line number is between 2 colons", () => {
      rawLine = "src/sub/dir/file.ext:123:  const a = 1;";

      expect(new StructuredLine(rawLine)).toHaveProperty(
        "codeLine",
        "  const a = 1;"
      );
    });
  });
});
