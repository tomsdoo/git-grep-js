import { afterEach, describe, it, expect, jest } from "@jest/globals";
import { SearchResultBlock, StructuredLine, Utility } from "@/index";

describe("exports", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("SearchResultBlock is defined", () => {
    expect(SearchResultBlock).not.toBeUndefined();
  });

  it("StructuredLine is defined", () => {
    expect(StructuredLine).not.toBeUndefined();
  });

  it("Utility is defined", () => {
    expect(Utility).not.toBeUndefined();
  });
});
