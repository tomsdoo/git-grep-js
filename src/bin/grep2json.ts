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
import { Logger } from "../modules/Logger";

const program = new Command();
const commandName = "grep2json";

program.option("--init-config", "initialize configuration");

program.on("--help", () => {
  console.log("");
  console.log("Example call:");
  console.log(`  ${commandName} --help`);
  console.log(`  git grep -n -C 1 -e "some" | npx ${commandName}`);
  console.log(`  ${commandName} --init-config`);
  console.log(``);
  console.log(`see https://git-grep-json.netlify.app/ for details`);
  console.log(``);
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
  console.log(`configuration file is initialized: ${fileName}`);
}

async function behaveAsIsTTY(opts: any): Promise<void> {
  if (opts.initConfig as boolean) {
    await initializeConfigurationFile();
    return;
  }
  program.help();
}

(async () => {
  ///
  const config = await getConfig();

  const { isTTY, opts, stdin: stdinData } = await getInputData(program);
  if (isTTY) {
    await behaveAsIsTTY(opts);
    return;
  }

  const store = await (config?.prepareStore ?? defaultPrepareStore)(
    new Utility()
  );
  const blocks = stdinData
    .replace(/\n\n/g, "\n--\n")
    .split("\n--\n")
    .map((resultBlock) => new SearchResultBlock(resultBlock));
  const logger = new Logger();
  logger.writeFirst();
  for (const [blockIndex, block] of Object.entries(blocks)) {
    const matchedStructuredLines = block.matchedStructuredLines;
    const isLastBlock = Number(blockIndex) === blocks.length - 1;
    for (const [structuredLineIndex, structuredLine] of Object.entries(
      matchedStructuredLines
    )) {
      const obj = await (config?.setupResult ?? defaultSetupResult)(
        block,
        structuredLine,
        store
      );

      const isLastItem =
        isLastBlock &&
        Number(structuredLineIndex) === matchedStructuredLines.length - 1;
      logger.writeObject(obj, isLastItem);
    }
  }
  logger.writeLast();

  ///
})()
  .then(() => {})
  .catch(() => {});
