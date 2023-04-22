import { afterEach, describe, it, expect, jest } from "@jest/globals";
import { SearchResultBlock, StructuredLine, Utility, testFunc } from "@/index";

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

describe("testFunc", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns a number what is 1 greater than the parameter value", () => {
    expect(testFunc(1)).toBe(2);
  });
});
