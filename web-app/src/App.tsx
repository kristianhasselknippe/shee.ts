import * as React from "react";
import "./App.css";

import logo from "./logo.svg";
import { Table, Workspace, Cell } from "sheets";
import { SheetsWorkspace } from "./components/Workspace";

interface AppState {
  workspace: Workspace;
}

class App extends React.Component<any, AppState> {
  componentDidMount() {
    const table = new Table("Table one", 3, 3);
    table.setCell(0, 0, 1);
    table.setCell(1, 0, 2);
    table.setCell(2, 0, 3);

    table.setCell(0, 1, 4);
    table.setCell(1, 1, 5);
    table.setCell(2, 1, 6);

    table.setCell(0, 2, 7);
    table.setCell(1, 2, 8);
    table.setCell(2, 2, 9);

    const derived = table.derive("Derived table", item => {
      if (item) {
        return new Cell((item.getValue() as number) * 2);
      } else {
        throw "Cell was undefined";
      }
    });

    const workspace = new Workspace();
    workspace.addTable(table);
    workspace.addTable(derived);

    this.setState({
      workspace
    });
  }

  renderWorkspace = () => {
    if (this.state) {
      return <SheetsWorkspace workspace={this.state.workspace} />;
    } else {
      return null;
    }
  };

  public render() {
    console.log("Rendering ", this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get heisann <code>Foobar</code> and save to reload.
        </p>
        {this.renderWorkspace()}
      </div>
    );
  }
}

export default App;
