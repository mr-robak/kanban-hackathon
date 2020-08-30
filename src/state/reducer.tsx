import { Action, State, Tasks, Columns, SingleTask } from "../models/index";

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case "addColumn": {
      const numberOfColumns = state.columnOrder.length;
      //make new id
      let columnId = `column-${numberOfColumns + 1}`;

      const newColumnOrder = [...state.columnOrder, columnId];
      const newColumns = { ...state.columns };
      newColumns[columnId] = { id: columnId, title: "Title", taskIds: [] };
      console.log({
        ...state,
        columnOrder: newColumnOrder,
        columns: newColumnOrder,
      });
      break;
      // return { ...state, columnOrder: newColumnOrder, columns: newColumnOrder };
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
      //id of column to add task to
      const columnId = action.payload;

      //update tasks
      const id = `task-${Object.keys(state.tasks)}`;
      const newTask: SingleTask = {
        id,
        title: "Edit title",
        description: "Add task's details",
      };
      const newTasks = { ...state.tasks, newTask };

      //updateColumn
      const columnCopy = { ...state.columns[columnId] };
      const newColumn = { ...columnCopy, taskIds: columnCopy.taskIds.push(id) };
      const newColumns = { ...state.columns, columnId: newColumn };
      return { ...state, tasks: newTasks, columns: newColumns };
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
