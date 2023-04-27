import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import { Logger } from "@/modules/Logger";

describe("Logger", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("has padding", () => {
    it("no parameter for constructor", () => {
      expect(new Logger()).toHaveProperty("padding", "  ");
    });

    it("4 for constructor parameter", () => {
      expect(new Logger(4)).toHaveProperty("padding", "    ");
    });
  });

  it("writeStart()", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    new Logger().writeFirst();

    expect(spy).toHaveBeenCalledWith("[");
  });

  it("writeLast()", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    new Logger().writeLast();

    expect(spy).toHaveBeenCalledWith("]");
  });

  describe("writeObject()", () => {
    let objToBeOutput: any;
    beforeEach(() => {
      objToBeOutput = {
        prop1: "prop1",
        prop2: "prop2",
      };
    });

    describe("spaceWidth is default", () => {
      let logger: Logger;
      beforeEach(() => {
        logger = new Logger();
      });

      it("isLastItem is false", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => {});
        logger.writeObject(objToBeOutput, false);

        expect(spy).toHaveBeenCalledTimes(4);
        expect(spy).toHaveBeenNthCalledWith(1, `  {`);
        expect(spy).toHaveBeenNthCalledWith(2, `    "prop1": "prop1",`);
        expect(spy).toHaveBeenNthCalledWith(3, `    "prop2": "prop2"`);
        expect(spy).toHaveBeenNthCalledWith(4, `  },`);
      });

      it("isLastItem is true", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => {});
        logger.writeObject(objToBeOutput, true);

        expect(spy).toHaveBeenCalledTimes(4);
        expect(spy).toHaveBeenNthCalledWith(1, `  {`);
        expect(spy).toHaveBeenNthCalledWith(2, `    "prop1": "prop1",`);
        expect(spy).toHaveBeenNthCalledWith(3, `    "prop2": "prop2"`);
        expect(spy).toHaveBeenNthCalledWith(4, `  }`);
      });
    });

    describe("spaceWidth is 4", () => {
      let logger: Logger;
      beforeEach(() => {
        logger = new Logger(4);
      });

      it("isLastItem is false", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => {});
        logger.writeObject(objToBeOutput, false);

        expect(spy).toHaveBeenCalledTimes(4);
        expect(spy).toHaveBeenNthCalledWith(1, `    {`);
        expect(spy).toHaveBeenNthCalledWith(2, `        "prop1": "prop1",`);
        expect(spy).toHaveBeenNthCalledWith(3, `        "prop2": "prop2"`);
        expect(spy).toHaveBeenNthCalledWith(4, `    },`);
      });

      it("isLastItem is true", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => {});
        logger.writeObject(objToBeOutput, true);

        expect(spy).toHaveBeenCalledTimes(4);
        expect(spy).toHaveBeenNthCalledWith(1, `    {`);
        expect(spy).toHaveBeenNthCalledWith(2, `        "prop1": "prop1",`);
        expect(spy).toHaveBeenNthCalledWith(3, `        "prop2": "prop2"`);
        expect(spy).toHaveBeenNthCalledWith(4, `    }`);
      });
    });
  });
});
