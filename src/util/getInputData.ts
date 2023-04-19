import type { Command } from "commander";
export async function getInputData(program: Command): Promise<{
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
