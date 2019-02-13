import { Workspace } from 'sheets'
import * as React from 'react'
import { SheetsTable } from './Table'

interface WorkspaceProps {
	workspace: Workspace
}

export class SheetsWorkspace extends React.Component<WorkspaceProps> {
	render() {
		return this.props.workspace.getTables().map(table => {
			return <SheetsTable table={table} />
		})
	}
}
