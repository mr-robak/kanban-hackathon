import { Action, State, Tasks, Columns, SingleTask } from "../models/index";

const usedIds = [1, 2, 3];

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case "addColumn": {
      let newIdNumber = state.columnOrder.length + 1;

      console.log(usedIds);
      while (usedIds.includes(newIdNumber)) {
        newIdNumber = newIdNumber + 1;
      }
      usedIds.push(newIdNumber);
      let columnId = `column-${newIdNumber}`;

      const newColumnOrder = [...state.columnOrder, columnId];
      const newColumns = { ...state.columns };
      newColumns[columnId] = { id: columnId, title: "Title", taskIds: [] };

      console.log({
        ...state,
        columnOrder: newColumns,
        columns: newColumnOrder,
      });
      return { ...state, columnOrder: newColumnOrder, columns: newColumns };
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
      const id = `task-${Object.keys(state.tasks).length + 1}`;
      const newTask: SingleTask = {
        id,
        title: "Edit title",
        description: "Add task's details",
      };
      const newTasks = { ...state.tasks, [id]: newTask };

      //updateColumn
      const columnCopy = { ...state.columns[columnId] };
      const newColumn = { ...columnCopy, taskIds: [...columnCopy.taskIds, id] };
      const newColumns = { ...state.columns, [columnId]: newColumn };
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
