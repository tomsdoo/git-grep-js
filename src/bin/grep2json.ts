#!/usr/bin/env node
import { SearchResultBlock } from "../modules/SearchResultBlock";

async function getInputData(): Promise<string> {
  return await new Promise((resolve) => {
    if (process.stdin.isTTY) {
      resolve(process.argv[2]);
    } else {
      let stdin = "";
      process.stdin.on("readable", () => {
        const chunk = process.stdin.read();
        if (chunk != null) {
          stdin += chunk as string;
        }
      });

      process.stdin.on("end", () => {
        resolve(stdin);
      });
    }
  });
}

(async () => {
  ///

  const stdinData = await getInputData();
  const blocks = stdinData
    .replace(/\n\n/g, "\n--\n")
    .split("\n--\n")
    .map((resultBlock) => new SearchResultBlock(resultBlock));
  console.log(`[`);
  blocks.forEach((block, blockIndex) => {
    const matchedStructuredLines = block.matchedStructuredLines;
    matchedStructuredLines.forEach((structuredLine, structuredLineIndex) => {
      const obj = {
        fileName: block.structuredLines[0].fileName,
        matchedLineNumber: structuredLine.lineNumber,
        codeLines: block.codeLines,
        lineRange: {
          start: block.structuredLines[0].lineNumber,
          end: block.structuredLines.slice(-1)[0].lineNumber,
        },
      };
      const sObj = JSON.stringify(obj, null, 2);
      const isLastItem =
        blockIndex === blocks.length - 1 &&
        structuredLineIndex === matchedStructuredLines.length - 1;
      const sComma = isLastItem ? "" : ",";
      const sObjNComma = `${sObj}${sComma}`;
      sObjNComma.split("\n").forEach((outLine) => {
        console.log(`  ${outLine}`);
      });
    });
  });
  console.log(`]`);

  ///
})()
  .then(() => {})
  .catch(() => {});
