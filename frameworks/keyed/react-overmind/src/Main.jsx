import React from "react";
import Row from "./Row";
import connect from "./store";

const List = connect(({ overmind }) => {
  return (
    <table className="table table-hover table-striped test-data">
      <tbody>
        {overmind.state.rows.map((row, index) => (
          <Row key={row.id} index={index} />
        ))}
      </tbody>
    </table>
  );
});

function Main({ overmind }) {
  const {
    actions: { run, runLots, add, update, clear, swapRows }
  } = overmind;
  return (
    <div className="container">
      <div className="jumbotron">
        <div className="row">
          <div className="col-md-6">
            <h1>React Overmind</h1>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-sm-6 smallpad">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  id="run"
                  onClick={run}
                >
                  Create 1,000 rows
                </button>
              </div>
              <div className="col-sm-6 smallpad">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  id="runlots"
                  onClick={runLots}
                >
                  Create 10,000 rows
                </button>
              </div>
              <div className="col-sm-6 smallpad">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  id="add"
                  onClick={add}
                >
                  Append 1,000 rows
                </button>
              </div>
              <div className="col-sm-6 smallpad">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  id="update"
                  onClick={update}
                >
                  Update every 10th row
                </button>
              </div>
              <div className="col-sm-6 smallpad">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  id="clear"
                  onClick={clear}
                >
                  Clear
                </button>
              </div>
              <div className="col-sm-6 smallpad">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  id="swaprows"
                  onClick={swapRows}
                >
                  Swap Rows
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <List />
      <span
        className="preloadicon glyphicon glyphicon-remove"
        aria-hidden="true"
      />
    </div>
  );
}

export default connect(Main);
