import * as React from 'react'
import * as Sheets from 'sheets'

interface TableProps {
	table: Sheets.Table
}

export class SheetsTable extends React.Component<TableProps> {
	render() {
		const table = this.props.table
		return (
			<div>
				<p>fooooobar</p>
				<p>{table.name}</p>
			</div>
		)
	}
}
