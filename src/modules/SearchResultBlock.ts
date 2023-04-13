export class SearchResultBlock {
  protected _rawLines: string[];
  constructor(block: string) {
    this._rawLines = block.split("\n");
  }
}
