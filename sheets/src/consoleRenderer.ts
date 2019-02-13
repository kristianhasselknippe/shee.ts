import { Table } from ".";

function dup(n: number, s: string) {
	let ret = ""
	for (let i = 0; i < n; i++) {
		ret += s
	}
	return ret
}

function spaces(n: number) {
	return dup(n, " ")
}

export function renderTable(table: Table) {
	const cellWidths = []
	const cellValues = []
	const cells = table.getCells()
	for (let x = 0; x < table.width; x++) {
		let largestCellWidth = 3
		for (let y = 0; y < table.height; y++) {
			const cellValue = table.getCellValue(x,y)
			const cellWidth = cellValue.toString().length + 2
			if (cellWidth > largestCellWidth) {
				largestCellWidth = cellWidth
			}
			cellValues[(y * table.width) + x] = cellValue
		}
		cellWidths[x] = largestCellWidth
	}
	let ret = `Table: ${table.name}\n`
	ret += "+"
	for (let x = 0; x < table.width; x++) {
		ret += `${dup(cellWidths[x], "-")}+`
	}
	ret += "\n"
	for (let y = 0; y < table.height; y++) {
		let row = "|"
		for (let x = 0; x < table.width; x++) {
			const cellValue =  cellValues[(y * table.width) + x]
			row += ` ${cellValue}` + spaces(cellWidths[x] - cellValue.toString().length - 1) + "|"
		}
		ret += `${row}\n`
		ret += "+"
		for (let x = 0; x < table.width; x++) {
			ret += `${dup(cellWidths[x], "-")}+`
		}
		ret += "\n"
	}
	return ret
}
