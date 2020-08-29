import { State } from "../models/index";

export function saveState(state: State): void {
  const { tasks, columns, columnOrder } = state;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("columns", JSON.stringify(columns));
  localStorage.setItem("columnOrder", JSON.stringify(columnOrder));
}

export function getState(): State {
  return {
    tasks: JSON.parse(localStorage.tasks),
    columns: JSON.parse(localStorage.columns),
    columnOrder: JSON.parse(localStorage.columnOrder),
  };
}
