export class StructuredLine {
  protected _fileName: string;
  protected _rawLine: string;
  constructor(rawLine: string) {
    this._rawLine = rawLine;
    this._fileName = rawLine.split("-")[0].split(":")[0];
  }

  public get rawLine(): string {
    return this._rawLine;
  }
}
