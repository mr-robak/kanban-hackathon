import { Action, State, Tasks, Columns, SingleTask } from "../models/index";
import { initialState } from "./BoardContext";

const usedIds = [1, 2, 3];

interface Column {
  [key: string]: {
    id: string;
    title: string;
    taskIds: string[];
  };
}

interface Task {
  [key: string]: { id: string; title: string; description: string };
}

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case "addColumn": {
      let newIdNumber = state.columnOrder.length + 1;
      while (usedIds.includes(newIdNumber)) {
        newIdNumber = newIdNumber + 1;
      }
      usedIds.push(newIdNumber);
      let columnId = `column-${newIdNumber}`;

      const newColumnOrder = [...state.columnOrder, columnId];
      const newColumns = { ...state.columns };
      newColumns[columnId] = { id: columnId, title: "Title", taskIds: [] };

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
        imageId: null,
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
    case "moveCard": {
      const { column, id, startColumn } = action.payload;
      const currentColumns = { ...state.columns };
      const newColumns: Column = {};
      for (let col in currentColumns) {
        if (col === column.id) {
          const newTasks = [...currentColumns[col].taskIds, id];
          console.log(newTasks);
          newColumns[col] = { ...currentColumns[col], taskIds: newTasks };
        } else if (col === startColumn) {
          console.log("Hello");
          const updateTasks = [...currentColumns[col].taskIds].filter(
            (task) => task !== id
          );
          newColumns[col] = { ...currentColumns[col], taskIds: updateTasks };
        } else {
          newColumns[col] = { ...currentColumns[col] };
        }
      }
      return { ...state, columns: newColumns };
    }
    case "newTitle": {
      const { id } = action.payload;
      const currentColumns = { ...state.columns };
      const newColumns: Column = {};
      for (let col in currentColumns) {
        if (id === col) {
          newColumns[col] = { ...action.payload };
        } else {
          newColumns[col] = currentColumns[col];
        }
      }
      return { ...state, columns: newColumns };
    }
    case "clearColumn": {
      const columnId = action.payload;
      const tasksToDelete = [...state.columns[columnId].taskIds];

      const currentTasks = { ...state.tasks };
      const newTasks: Task = {};
      for (let task in currentTasks) {
        if (!tasksToDelete.includes(task)) {
          newTasks[task] = currentTasks[task];
        }
      }

      const currentColumns = { ...state.columns };
      const newColumns: Column = {};
      for (let col in currentColumns) {
        if (columnId === col) {
          newColumns[col] = { ...currentColumns[col], taskIds: [] };
        } else {
          newColumns[col] = currentColumns[col];
        }
      }
      return { ...state, columns: newColumns, tasks: newTasks };
    }
    case "reset": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
