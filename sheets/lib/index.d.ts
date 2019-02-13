import * as Expr from './expression';
export declare type CellValue = number | string;
export declare class Formula {
    private expr;
    constructor(expr: Expr.Expression);
    evaluate(): CellValue;
}
export declare type CellReference = Cell;
export declare type CellContent = CellValue | CellReference | Formula;
export declare class Cell extends Expr.Expression {
    readonly content: CellContent;
    constructor(content: CellContent);
    evaluate(): number;
    getValue(): CellValue;
}
export declare class Table {
    readonly name: string;
    readonly width: number;
    readonly height: number;
    private cells;
    constructor(name: string, width: number, height: number);
    getCells(): Cell[];
    protected index(x: number, y: number): number;
    reference(x: number, y: number): CellReference;
    setCell(x: number, y: number, value: CellContent): void;
    getCell(x: number, y: number): Cell;
    getCellValue(x: number, y: number): CellValue;
    getCellContent(x: number, y: number): CellContent;
    derive(name: string, func: (...items: (Cell | undefined)[]) => Cell): DerivedTable;
}
export declare class DerivedTable extends Table {
    private func;
    tables: Table[];
    constructor(name: string, func: (...items: (Cell | undefined)[]) => Cell, ...tables: Table[]);
    getCell(x: number, y: number): Cell;
}
//# sourceMappingURL=index.d.ts.map