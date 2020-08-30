import { Action, State, Tasks } from "../models/index";

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case "addColumn": {
      return state;
    }
    case "deleteColumn": {
      return state;
    }
    case "addTask": {
      return state;
    }
    case "deleteTask": {
      //id of task to delete
      const id = action.payload;

      //update tasks
      const newTasks: Tasks = {};
      for (const key in state.tasks) {
        if (key !== id) {
          newTasks[key] = state.tasks[key];
        }
      }
      //update columns
      const newColumns = { ...state.columns };
      for (const key in newColumns) {
        newColumns[key].taskIds = newColumns[key].taskIds.filter(
          (taskId) => taskId !== id
        );
      }

      return { ...state, columns: newColumns, tasks: newTasks };
    }
    default: {
      return state;
    }
  }
}
