# git-grep-json

It's a tool for git-grep.

![npm](https://img.shields.io/npm/v/git-grep-json)
![NPM](https://img.shields.io/npm/l/git-grep-json)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/git-grep-json)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/git-grep-json)
![Maintenance](https://img.shields.io/maintenance/yes/2023)

## installation

``` shell
npm install git-grep-json
```

## usage

- grep with `-n` and `-C`
    ``` shell
    git grep -n -C 2 -e "some" | npx grep2json
    ```

- grep with `-n` and `-A`
    ``` shell
    git grep -n -A 1 -e "some" | npx grep2json
    ```

- grep with `-n` and `-B`
    ``` shell
    git grep -n -B 1 -e "some" | npx grep2json
    ```

- result
    ``` shell
    [
      {
        "fileName": "test.js",
        "matchedLineNumber": 1,
        "codeLines": [
          "function someFunc(){",
          "  return 1;"
        ],
        "lineRange": {
          "start": 1,
          "end": 2
        }
      },
      {
        "fileName": "test.js",
        "matchedLineNumber": 6,
        "codeLines": [
          "function otherFunc(){",
          "  return \"awesome\";",
          "}"
        ],
        "lineRange": {
          "start": 5,
          "end": 7
        }
      }
    ]
    ```

## configurations

`grep2json.config.js` in process currend directory can change the outout.
``` shell
module.exports = {
  makeObject: async (block, structuredLine) => {
    return await Promise.resolve({
      fileName: structuredLine.fileName,
      matchedLineNumber: structuredLine.lineNumber,
      line: structuredLine.codeLine
    });
  }
};
```
