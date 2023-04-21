#!/usr/bin/env node
import { Command } from "commander";
import { SearchResultBlock } from "../modules/SearchResultBlock";
import type { StructuredLine } from "../modules/StructuredLine";
import { getConfig } from "../util/getConfig";
import { cwd } from "process";
import { writeFile } from "fs/promises";
import { join } from "path";
import { getInputData } from "../util/getInputData";
import { Utility } from "../modules/Utility";

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

async function defaultPrepareStore(util: Utility): Promise<any> {
  return await Promise.resolve({});
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
  prepareStore: async (util) => await Promise.resolve({}),
  setupResult: async (block, structuredLine, store) => {
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

  const { isTTY, opts, stdin: stdinData } = await getInputData(program);
  if (isTTY) {
    if (opts.initConfig as boolean) {
      await initializeConfigurationFile();
      return;
    }
    program.help();
    return;
  }
  const store = await (config?.prepareStore ?? defaultPrepareStore)(
    new Utility()
  );
  const blocks = stdinData
    .replace(/\n\n/g, "\n--\n")
    .split("\n--\n")
    .map((resultBlock) => new SearchResultBlock(resultBlock));
  console.log(`[`);
  for (const [blockIndex, block] of Object.entries(blocks)) {
    const matchedStructuredLines = block.matchedStructuredLines;
    for (const [structuredLineIndex, structuredLine] of Object.entries(
      matchedStructuredLines
    )) {
      const obj = await (config?.setupResult ?? defaultSetupResult)(
        block,
        structuredLine,
        store
      );

      const sObj = JSON.stringify(obj, null, 2);
      const isLastItem =
        Number(blockIndex) === blocks.length - 1 &&
        Number(structuredLineIndex) === matchedStructuredLines.length - 1;
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
