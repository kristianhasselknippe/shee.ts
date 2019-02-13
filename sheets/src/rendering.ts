import { Table } from ".";

export function createRenderingInfo(table: Table) {
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
	return {
		cellWidths,
		cellValues
	}
}
