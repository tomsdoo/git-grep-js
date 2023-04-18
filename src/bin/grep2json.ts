#!/usr/bin/env node
import { Command } from "commander";
import { SearchResultBlock } from "../modules/SearchResultBlock";
import type { StructuredLine } from "../modules/StructuredLine";
import { getConfig } from "../util/getConfig";
import { cwd } from "process";
import { writeFile } from "fs/promises";
import { join } from "path";

const program = new Command();
const commandName = "grep2json";

program.option("--init-config", "initialize configuration");

program.on("--help", () => {
  console.log("");
  console.log("Example call:");
  console.log(`  ${commandName} --help`);
  console.log(`  git grep -n -C 1 -e "some" | npx ${commandName}`);
  console.log(`  ${commandName} --init-config`);
});

async function getInputData(): Promise<{
  isTTY: boolean;
  stdin: string;
  opts: any;
}> {
  return await new Promise((resolve) => {
    if (process.stdin.isTTY) {
      program.parse(process.argv);

      const opts = program.opts();
      resolve({
        isTTY: true,
        opts,
        stdin: "",
      });
    } else {
      let stdin = "";
      process.stdin.on("readable", () => {
        const chunk = process.stdin.read();
        if (chunk != null) {
          stdin += chunk as string;
        }
      });

      process.stdin.on("end", () => {
        resolve({
          isTTY: false,
          opts: {},
          stdin,
        });
      });
    }
  });
}

async function defaultSetupResult(
  block: SearchResultBlock,
  structuredLine: StructuredLine
): Promise<any> {
  return await Promise.resolve({
    fileName: structuredLine.fileName,
    matchedLineNumber: structuredLine.lineNumber,
    codeLines: block.codeLines,
    lineRange: {
      start: block.structuredLines[0].lineNumber,
      end: block.structuredLines.slice(-1)[0].lineNumber,
    },
  });
}

const defaultConfigFileCode = `
module.exports = {
  setupResult: async (block, structuredLine) => {
    return await Promise.resolve({
      fileName: structuredLine.fileName,
      matchedLineNumber: structuredLine.lineNumber,
      line: structuredLine.codeLine
    });
  }
};
`;
async function initializeConfigurationFile(): Promise<void> {
  const fileName = join(cwd(), "./grep2json.config.js");
  await writeFile(fileName, defaultConfigFileCode);
}

(async () => {
  ///
  const config = await getConfig();

  const { isTTY, opts, stdin: stdinData } = await getInputData();
  if (isTTY) {
    if (opts.initConfig as boolean) {
      await initializeConfigurationFile();
      return;
    }
    program.help();
    return;
  }
  const blocks = stdinData
    .replace(/\n\n/g, "\n--\n")
    .split("\n--\n")
    .map((resultBlock) => new SearchResultBlock(resultBlock));
  console.log(`[`);
  for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
    const block = blocks[blockIndex];
    const matchedStructuredLines = block.matchedStructuredLines;
    for (
      let structuredLineIndex = 0;
      structuredLineIndex < matchedStructuredLines.length;
      structuredLineIndex++
    ) {
      const structuredLine = matchedStructuredLines[structuredLineIndex];

      const obj = await (config?.setupResult ?? defaultSetupResult)(
        block,
        structuredLine
      );

      const sObj = JSON.stringify(obj, null, 2);
      const isLastItem =
        blockIndex === blocks.length - 1 &&
        structuredLineIndex === matchedStructuredLines.length - 1;
      const sComma = isLastItem ? "" : ",";
      const sObjNComma = `${sObj}${sComma}`;
      sObjNComma.split("\n").forEach((outLine) => {
        console.log(`  ${outLine}`);
      });
    }
  }
  console.log(`]`);

  ///
})()
  .then(() => {})
  .catch(() => {});
