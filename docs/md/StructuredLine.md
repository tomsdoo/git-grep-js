# StructuredLine

``` mermaid
classDiagram

class StructuredLine {
  +string codeLine
  +string fileName
  +number lineNumber
  +boolean matched
  +string rawLine
  +constructor(rawLine: string)
}
```

## properties

|name|example|
|:--|:--|
|codeLine|const a = 1;|
|fileName|src/sub/dir/file.ext|
|lineNumber|3|
|matched|true|
|rawLine|src/sub/dir/file.ext:3:const a = 1;|

