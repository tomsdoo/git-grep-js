import { exec } from "child_process";

export interface Branch {
  name: string;
  sha: string;
}

export class Utility {
  public async execute(commandline: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      exec(commandline, (error, stdout) => {
        if (error != null) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  public async getCurrentBranch(): Promise<Branch> {
    const [, branchName, branchSha] = await this.execute(`git branch -v`)
      .then((s) => s.split("\n"))
      .then((lines) => lines.find((line) => line.startsWith("*")))
      .then((line) => line?.replace(/\s+/g, " "))
      .then((line) => line?.split(" ") as string[]);
    return {
      name: branchName,
      sha: branchSha,
    };
  }
}
