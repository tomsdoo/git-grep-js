export class StructuredLine {
  protected _fileName: string;
  protected _matched: boolean;
  protected _rawLine: string;
  constructor(rawLine: string) {
    this._rawLine = rawLine;
    this._fileName = rawLine.split("-")[0].split(":")[0];
    const colonDividedFileName = rawLine.split(":")[0];
    this._matched = colonDividedFileName === this._fileName;
  }

  public get fileName(): string {
    return this._fileName;
  }

  public get matched(): boolean {
    return this._matched;
  }

  public get rawLine(): string {
    return this._rawLine;
  }
}
