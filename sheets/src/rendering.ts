import { Table } from ".";
import { Workspace, CellValue, DerivedTable } from "./workspace";

interface TableRenderingInfo {
	table: Table
	cellWidths: number[]
	cellValues: CellValue[]
}

export function createRenderingInfoForTable(table: Table): TableRenderingInfo {
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
		table,
		cellWidths,
		cellValues
	}
}

interface TableEdge {
	from: Table
	to: Table
}

interface WorkspaceRenderingInfo {
	tables: TableRenderingInfo[]
	edges: TableEdge[]
}

export function createRenderingInfoForWorkspace(workspace: Workspace): WorkspaceRenderingInfo {
	const tables = workspace.getTables()
	const tableInfos = []
	const edges: TableEdge[] = []
	for (const table of tables) {
		if (table instanceof DerivedTable) {
			for (const originTable of table.originTables) {
				edges.push({
					from: originTable,
					to: table
				})
			}
		}
		tableInfos.push(createRenderingInfoForTable(table))
	}
	return {
		tables: tableInfos,
		edges
	}
}
