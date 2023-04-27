export class Logger {
  protected spaceWidth: number;
  constructor(spaceWidth: number = 2) {
    this.spaceWidth = spaceWidth;
  }

  public get padding(): string {
    return Array(this.spaceWidth).fill(" ").join("");
  }

  public writeFirst(): void {
    console.log(`[`);
  }

  public writeLast(): void {
    console.log(`]`);
  }

  public writeObject(obj: any, isLastItem: boolean): void {
    const sObj = JSON.stringify(obj, null, this.spaceWidth);
    const sComma = isLastItem ? "" : ",";
    const sObjNComma = `${sObj}${sComma}`;
    sObjNComma.split("\n").forEach((line) => {
      console.log(`${this.padding}${line}`);
    });
  }
}
