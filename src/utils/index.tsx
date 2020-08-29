import { State } from "../models/index";

export function saveState(state: State): void {
  const { tasks, columns, columnOrder } = state;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("columns", JSON.stringify(columns));
  localStorage.setItem("columnOrder", JSON.stringify(columnOrder));
}
