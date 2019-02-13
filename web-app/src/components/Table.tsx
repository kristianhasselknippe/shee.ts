import * as Sheets from 'sheets'
import "./Table.css"
import { createRenderingInfo } from 'sheets'

interface TableProps {
	table: Sheets.Table
	cellHeight: number
	renderingContext: CanvasRenderingContext2D
	offset: {
		x: number,
		y: number
	}
}

export class SheetTable {
	constructor(readonly props: TableProps) {
		
	}

	render(props: TableProps, mouse: MouseEvent | null) {
		const ctx = props.renderingContext
		const fontSize = 30
		ctx.font = `${fontSize}px Arial`
		const { cellValues, cellWidths } = createRenderingInfo(props.table)
		let yPos = props.offset.y
		for (let y = 0; y < props.table.height; y++) {
			let xPos = props.offset.x
			for (let x = 0; x < props.table.width; x++) {
				ctx.textAlign = "left"
				ctx.textBaseline = "top"
				ctx.fillText(cellValues[y * props.table.width + x].toString(), xPos, yPos)
				ctx.strokeRect(xPos, yPos, cellWidths[x] * 30, props.cellHeight * 30)
				xPos += cellWidths[x] * 30
			}

			console.log(`50,${yPos} - ${xPos},${yPos}`)
			yPos += props.cellHeight * 30
		}
	}
}
