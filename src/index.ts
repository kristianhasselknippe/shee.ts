type CellValue = number | string

class Cell {
	constructor(readonly value: CellValue) {}
}

class Table {
	private cells: Cell[][] = []
	constructor(readonly name: string) {
		
	}

	setCell(x: number, y: number, value: CellValue)
}


const table = new Table("Salaries")
