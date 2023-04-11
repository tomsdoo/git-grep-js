import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { testFunc } from "@/index";

describe("testFunc", () => {
  it("returns a number what is 1 greater than the parameter value", () => {
    expect(testFunc(1)).toBe(2);
  });
});
