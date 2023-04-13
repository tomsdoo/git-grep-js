export class SearchResultBlock {
  protected _rawLines: string[];
  constructor(block: string) {
    this._rawLines = block.split("\n");
  }

  public get rawLines(): string[] {
    return this._rawLines.slice();
  }
}
