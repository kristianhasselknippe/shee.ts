import * as Expr from './expression'
import { renderTable } from './consoleRenderer';

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

class Cell extends Expr.Expression {
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

	private index(x: number, y: number) {
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
}

	const t = new Table("Table one", 4, 3)
	t.setCell(0,0,0)
	t.setCell(1,0,100000)
	t.setCell(2,0,20)
	t.setCell(3,0,30)

	t.setCell(0,1,1)
	t.setCell(1,1,11)
	t.setCell(2,1,21123)
	t.setCell(3,1,31)

	t.setCell(0,2,2)
	t.setCell(1,2,12)
	t.setCell(2,2,22)
	t.setCell(3,2,32)

	console.log(renderTable(t))
