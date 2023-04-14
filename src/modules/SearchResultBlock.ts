import { StructuredLine } from "./StructuredLine";

export class SearchResultBlock {
  protected _rawLines: string[];
  protected _structuredLines: StructuredLine[];
  constructor(block: string) {
    this._rawLines = block.split("\n");
    this._structuredLines = this._rawLines.map(
      (line) => new StructuredLine(line)
    );
  }

  public get matchedStructuredLines(): StructuredLine[] {
    return this._structuredLines.filter(({ matched }) => matched);
  }

  public get rawLines(): string[] {
    return this._rawLines.slice();
  }

  public get structuredLines(): StructuredLine[] {
    return this._structuredLines;
  }
}
