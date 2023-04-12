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
});
