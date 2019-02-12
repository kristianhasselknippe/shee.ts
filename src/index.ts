import * as Expr from './expression'

type CellValue = number | string

export class Formula {
	constructor(private expr: Expr.Expression) {
		
	}

	evaluate(): CellValue {
		return this.expr.evaluate()
	}
}

type CellReference = Cell

type CellContent = CellValue | CellReference | Formula

class Cell {
	constructor(readonly content: CellContent) {}

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
		private name: string,
		private width: number,
		private height: number
	) {

	}

	private index(x: number, y: number) {
		return y * this.height + x
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
}

export class TableFunction {
	constructor(readonly forumla: Formula) {
		
	}
}
