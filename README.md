# git-grep-json

It's a tool for git-grep.

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