# Classes

- [SearchResultBlock](./SearchResultBlock.md)
- [StructuredLine](./StructuredLine.md)

``` mermaid
classDiagram

class SearchResultBlock {
  +StructuredLine[] structredLines
  +StructuredLine[] matchedStructuredLines
}

class StructuredLine

SearchResultBlock o-- StructuredLine
```