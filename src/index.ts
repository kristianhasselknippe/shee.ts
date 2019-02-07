interface Formula {}

type CellValue = number | string
type CellReference = Cell
type CellContent = CellValue | CellReference | Formula

class Cell {
	constructor(readonly content: CellContent) {}

	getValue(): CellValue {
		console.log("This content: ", this.content)
		if (typeof this.content === 'number' || typeof this.content === 'string') {
			console.log("    returning: " + this.content)
			return this.content
		} else if (this.content instanceof Cell) {
			return this.content.getValue()
		} else {
			//Evaluate formula
			throw new Error("Formulas not yet supported")
		}
	}
}

export class Table {
	private cells: Cell[] = []

	constructor(readonly name: string, readonly width: number, readonly height: number) {

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
