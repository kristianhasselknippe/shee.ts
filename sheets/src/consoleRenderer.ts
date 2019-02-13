import { Table } from ".";
import { createRenderingInfoForTable } from "./rendering";

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
	const { cellWidths, cellValues } = createRenderingInfoForTable(table)
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
