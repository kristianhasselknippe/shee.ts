interface Reference {}

interface Formula {}

type CellValue = number | string | Reference | Formula

class Cell {
	constructor(readonly value: CellValue) {}
}

export class Table {
	private cells: Cell[] = []

	constructor(readonly name: string, readonly width: number, readonly height: number) {

	}

	private index(x: number, y: number) {
		return y * this.height + x
	}

	setCell(x: number, y: number, value: CellValue) {
		this.cells[this.index(x,y)] = new Cell(value)
	}

	getCellValue(x: number, y: number) {
		return this.cells[this.index(x,y)].value
	}
}
