import * as React from "react";
import "./App.css";

import logo from "./logo.svg";
import { Table } from "sheets";
import { SheetsTable } from "./components/Table";

interface AppState {
  table: Table;
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
    this.setState({
      table
    });
  }

  renderWorkspace = () => {
    if (this.state) {
      return <SheetsTable table={this.state.table} />;
    } else {
      return null;
    }
  };

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get heisann <code>Foobar</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
