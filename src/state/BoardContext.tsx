import { createContext } from "react";
import { State, ContextValue } from "../models/index";
import { getState } from "../utils/index";

const isInLocalStorage: boolean =
  !!localStorage.columns && !!localStorage.tasks && !!localStorage.columnOrder;

export const initialState: State = isInLocalStorage
  ? getState()
  : {
      tasks: {
        "task-1": {
          id: "task-1",
          title: "Start Reading These Cards!",
          description:
            "These cards provide information on how to use The True Kanban Board",
          imageId: "null",
        },
        "task-2": {
          id: "task-2",
          title: "Create and Delete Cards",
          description:
            "You can create new cards using the column menu. Delete, edit, and move cards by clicking on each card's menu in it's upper right corner. You can also access all these options by right clicking anywhere on the card.",
          imageId: "null",
        },
        "task-3": {
          id: "task-3",
          title: "Move Cards Between Columns",
          description:
            "You can move cards by clicking and draging them to a new column. You can also move them by selecting Move in the card's menu and selection which column you want the card to go to.",
          imageId: "null",
        },
        "task-4": {
          id: "task-4",
          title: "Create, Delete, and Move Columns",
          description:
            "Columns can be deleted by accessing the column menu at the top left corner of each column. To create a column click the purple + button, then give your new column a new title! Drag the column to a new position by click-and-holding the column header.",
          imageId: "null",
        },
      },
      columns: {
        "column-1": {
          id: "column-1",
          title: "To do",
          taskIds: ["task-1", "task-2"],
        },
        "column-2": {
          id: "column-2",
          title: "In Progress",
          taskIds: ["task-3", "task-4"],
        },
        "column-3": {
          id: "column-3",
          title: "Done",
          taskIds: [],
        },
      },
      columnOrder: ["column-1", "column-2", "column-3"],
    };

const BoardContext: ContextValue = createContext<ContextValue>(null);

export default BoardContext;
