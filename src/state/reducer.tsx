import { Action, State, Tasks, Columns } from "../models/index";

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case "addColumn": {
      return state;
    }
    case "deleteColumn": {
      const id = action.payload;

      const tasksToDelete = [...state.columns[action.payload].taskIds];
      const newTasks: Tasks = {};
      for (let key in state.tasks) {
        if (!tasksToDelete.includes(key)) {
          newTasks[key] = state.tasks[key];
        }
      }

      const newColumns: Columns = {};
      for (let key in state.columns) {
        if (key !== id) {
          newColumns[key] = state.columns[key];
        }
      }

      const newColumnOrder = [...state.columnOrder].filter(
        (column) => column !== id
      );

      return {
        ...state,
        columns: newColumns,
        tasks: newTasks,
        columnOrder: newColumnOrder,
      };
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
    case "moveTasks": {
      return { ...action.payload };
    }
    case "moveColumns": {
      return { ...action.payload };
    }
    default: {
      return state;
    }
  }
}
