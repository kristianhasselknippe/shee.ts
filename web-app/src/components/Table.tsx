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

export function renderTable(props: TableProps) {
	const ctx = props.renderingContext
	const fontSize = 30
	ctx.font = `${fontSize}px Arial`
	const { cellValues, cellWidths } = createRenderingInfo(props.table)
	let yPos = 50
	for (let y = 0; y < props.table.height; y++) {
		let xPos = 50
		for (let x = 0; x < props.table.width; x++) {
			ctx.fillText(cellValues[y * props.table.width + x].toString(), xPos + props.offset.x, yPos + props.offset.y)
			xPos += cellWidths[x] * 30
		}
		ctx.moveTo(50 + props.offset.x, yPos)
		ctx.lineTo(xPos + props.offset.x, yPos)
		ctx.stroke()
		console.log(`50,${yPos} - ${xPos},${yPos}`)
		yPos += props.cellHeight * 30
	}
}
