import * as Expr from './expression'
import { renderTable } from './consoleRenderer';

export type CellValue = number | string

export class Formula {
	constructor(private expr: Expr.Expression) {

	}

	evaluate(): CellValue {
		return this.expr.evaluate()
	}
}

export type CellReference = Cell

export type CellContent = CellValue | CellReference | Formula

export class Cell extends Expr.Expression {
	constructor(readonly content: CellContent) {
		super()
	}

	evaluate(): number {
		const ret = this.getValue()
		if (typeof ret === "string") {
			throw "Tried to evaluate cell as expression, but it returned string. This is currently not supported"
		}
		return ret
	}

	getValue(): CellValue {
		if (typeof this.content === 'number' || typeof this.content === 'string') {
			return this.content
		} else if (this.content instanceof Cell) {
			return this.content.getValue()
		} else if (this.content instanceof Formula) {
			return this.content.evaluate()
		} else {
			throw "Tried to get value of unknown content type"
		}
	}
}

export class Table {
	private cells: Cell[] = []

	constructor(
		readonly name: string,
		readonly width: number,
		readonly height: number
	) {

	}

	getCells() {
		return this.cells
	}

	protected index(x: number, y: number) {
		return (y * this.width) + x
	}

	reference(x: number, y: number): CellReference {
		return this.cells[this.index(x,y)]
	}

	setCell(x: number, y: number, value: CellContent) {
		this.cells[this.index(x,y)] = new Cell(value)
	}

	getCell(x: number, y: number) {
		return this.cells[this.index(x,y)]
	}

	getCellValue(x: number, y: number) {
		return this.getCell(x,y).getValue()

	}

	getCellContent(x: number, y: number) {
		return this.getCell(x,y).content
	}

	derive(name: string, func: (...items: (Cell | undefined)[]) => Cell) {
		return new DerivedTable(name, func, this)
	}
}

export class DerivedTable extends Table {
	tables: Table[]

	constructor(
		name: string,
		private func: (...items: (Cell | undefined)[]) => Cell,
		...tables: Table[]) {
		super(
			name,
			tables.reduce((prev, curr) => Math.max(prev, curr.width), 0),
			tables.reduce((prev, curr) => Math.max(prev, curr.height), 0)
		)
		this.tables = tables
	}

	getCell(x: number, y: number) {
		return this.func(...this.tables.map(c => c.getCell(x,y)))
	}
}

export class Workspace {
	private tables: Table[] = []

	addTable(table: Table) {
		this.tables.push(table)
	}

	getTables() {
		return this.tables
	}
}
