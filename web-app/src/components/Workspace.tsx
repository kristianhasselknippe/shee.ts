import { Workspace } from 'sheets'
import "./Workspace.css"
import * as React from 'react'
import { renderTable } from './Table';

interface WorkspaceProps {
	workspace: Workspace
}

interface WorkspaceState {
	mouseEvent: MouseEvent | null
}

export class SheetsWorkspace extends React.Component<WorkspaceProps, WorkspaceState> {

	constructor(props: WorkspaceProps) {
		super(props)
		this.state = {
			mouseEvent: null
		}
	}

	updateCanvas = () => {
		const canvas = this.refs.canvas as HTMLCanvasElement
		const ctx = canvas.getContext("2d")
		if (ctx) {
			let i = 0
			for (const table of this.props.workspace.getTables()){
				renderTable({
					renderingContext: ctx,
					table: table,
					cellHeight: 1,
					offset: {
						x: i * 450,
						y: 0
					}
				}, this.state.mouseEvent)
				i++
			}
		}
	}

	mouseDown = (e: MouseEvent) => {
		console.log('Mouse down: ', e)
		this.setState({
			mouseEvent: e
		})
	}

	mouseUp = (e: MouseEvent) => {
		console.log('Mouse up')
		this.setState({
			mouseEvent: null
		})
	}

	componentDidMount() {
		const canvas = this.refs.canvas as HTMLCanvasElement
		canvas.addEventListener('mousedown', e => {
			this.mouseDown(e)
		})
		canvas.addEventListener('mouseup', e => {
			this.mouseUp(e)
		})
		this.updateCanvas()
	}

	componentDidUpdate() {
		this.updateCanvas()
	}

	render() {
		console.log('Didd draw canvas')
		return (
			<canvas className="Workspace" width={1200} height={1200} ref="canvas" />
		)
	}
}
