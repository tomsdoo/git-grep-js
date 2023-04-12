export class StructuredLine {
  protected _codeLine: string;
  protected _fileName: string;
  protected _lineNumber: number;
  protected _matched: boolean;
  protected _rawLine: string;
  constructor(rawLine: string) {
    this._rawLine = rawLine;
    this._fileName = rawLine.split("-")[0].split(":")[0];
    const colonDividedFileName = rawLine.split(":")[0];
    this._matched = colonDividedFileName === this._fileName;
    const HYPHEN_CHARACTER_LENGTH = 1;
    const lineNumberAndCode = rawLine.slice(
      this._fileName.length + HYPHEN_CHARACTER_LENGTH
    );
    const sLineNumber = lineNumberAndCode.split("-")[0].split(":")[0];
    this._lineNumber = Number(sLineNumber);
    this._codeLine = lineNumberAndCode.slice(
      sLineNumber.length + HYPHEN_CHARACTER_LENGTH
    );
  }

  public get fileName(): string {
    return this._fileName;
  }

  public get lineNumber(): number {
    return this._lineNumber;
  }

  public get matched(): boolean {
    return this._matched;
  }

  public get rawLine(): string {
    return this._rawLine;
  }
}
