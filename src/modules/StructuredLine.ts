export class StructuredLine {
  protected _rawLine: string;
  constructor(rawLine: string) {
    this._rawLine = rawLine;
  }

  public get rawLine(): string {
    return this._rawLine;
  }
}
