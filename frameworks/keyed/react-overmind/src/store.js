import { Overmind } from "overmind";
import { createConnect } from "overmind-react";
import randomSentence from "./randomSentence";
import { startMeasure, stopMeasure } from "./logPerf";

let idCounter = 0;

const store = new Overmind({
  state: {
    rows: [],
    selected: null
  },
  actions: {
    deselectAll({ state }) {
      if (state.selected) {
        state.selected = null;
      }
    },
    buildRows({ state, actions, value: numOfRows }) {
      const data = new Array(numOfRows);
      for (let i = 0; i < numOfRows; i++) {
        const id = ++idCounter;
        data[i] = {
          id,
          label: randomSentence()
        };
      }
      state.rows.push(...data);
      actions.deselectAll();
    },
    run({ state, actions }) {
      startMeasure("run");
      state.rows = [];
      actions.buildRows(1000);
      stopMeasure("run");
    },
    add({ actions }) {
      startMeasure("add");
      actions.buildRows(1000);
      stopMeasure("add");
    },
    update({ state }) {
      startMeasure("update");
      for (let i = 0; i < state.rows.length; i += 10) {
        state.rows[i].label += " !!!";
      }
      stopMeasure("update");
    },
    select({ state, value: id }) {
      startMeasure("select");
      state.selected = id;
      stopMeasure("select");
    },
    delete({ state, value: row }) {
      startMeasure("delete");
      state.rows.splice(state.rows.indexOf(row), 1);
      stopMeasure("delete");
    },
    runLots({ state, actions }) {
      startMeasure("runLots");
      state.rows = [];
      actions.buildRows(10000);
      stopMeasure("runLots");
    },
    clear({ state }) {
      startMeasure("clear");
      state.rows = [];
      startMeasure("clear");
    },
    swapRows({ state }) {
      startMeasure("swapRows");
      if (state.rows.length > 998) {
        const temp = state.rows[1];
        state.rows[1] = state.rows[998];
        state.rows[998] = temp;
      }
      stopMeasure("swapRows");
    }
  }
});

window.store = store;

export default createConnect(store);
