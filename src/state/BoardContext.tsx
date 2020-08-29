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
          title: "Take out garbage",
          description: "Make sure to do recycling",
        },
        "task-2": {
          id: "task-2",
          title: "Code",
          description: "Hackathon Friday-Monday",
        },
        "task-3": {
          id: "task-3",
          title: "Clean",
          description: "Vacuum and mop, clean bathroom",
        },
        "task-4": {
          id: "task-4",
          title: "Apply for job",
          description: "Work on resume",
        },
      },
      columns: {
        "column-1": {
          id: "column-1",
          title: "To do",
          taskIds: ["task-1", "task-2", "task-3", "task-4"],
        },
        "column-2": {
          id: "column-2",
          title: "In Progress",
          taskIds: [],
        },
        "column-3": {
          id: "column-3",
          title: "Done",
          taskIds: [],
        },
      },
      columnOrder: ["column-1", "column-2", "column-3"],
    };

const BoardContext: React.Context<ContextValue> = createContext<ContextValue>(
  null
);

export default initialState;
