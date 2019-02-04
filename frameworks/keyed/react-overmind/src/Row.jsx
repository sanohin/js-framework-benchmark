import React, { Component } from "react";
import connect from "./store";

class Row extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onDelete() {
    const { index, overmind } = this.props;
    const row = overmind.state.rows[index];
    overmind.actions.delete(row.id);
  }

  onClick() {
    const { index, overmind } = this.props;
    const row = overmind.state.rows[index];
    overmind.actions.select(row.id);
  }

  render() {
    const { index, overmind } = this.props;
    const row = overmind.state.rows[index];

    const selected = overmind.state.selected === row.id;
    const styleClass = selected ? "danger" : "";

    return (
      <tr className={styleClass}>
        <td className="col-md-1">{row.id}</td>
        <td className="col-md-4">
          <a onClick={this.onClick}>{row.label}</a>
        </td>
        <td className="col-md-1">
          <a onClick={this.onDelete}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true" />
          </a>
        </td>
        <td className="col-md-6" />
      </tr>
    );
  }
}

export default connect(Row);
