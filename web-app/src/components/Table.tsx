import * as React from 'react'
import * as Sheets from 'sheets'
import "./Table.css"

interface TableProps {
	table: Sheets.Table
}

export class SheetsTable extends React.Component<TableProps> {

	renderTable = () => {
		let ret = []
		for (let y = 0; y < this.props.table.height; y++) {
			const row: any[] = []
			for (let x = 0; x < this.props.table.width; x++) {
				const val = this.props.table.getCellValue(x,y)
				row.push(val)
			}
			ret.push(row)
		}
		const retTable = (
			<table className="Table">
				<tbody>
					{
						ret.map(row => {
							return (
								<tr>
									{
										row.map(cellValue => {
											return (
												<th>
													<p>
														{cellValue}
													</p>
												</th>
											)
										})
									}
								</tr>
							)
						})
					}
				</tbody>
			</table>
		)

		return retTable
	}

	render() {
		const table = this.props.table
		return (
			<div className="Table">
				<p>{table.name}</p>
				{this.renderTable()}
			</div>
		)
	}
}
