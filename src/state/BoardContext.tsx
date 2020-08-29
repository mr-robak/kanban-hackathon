import React, { createContext } from "react";
import { State, ContextValue } from "../models/index";

//update interface later
export const initialState: any = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out garbage" },
    "task-2": { id: "task-2", content: "Code" },
    "task-3": { id: "task-3", content: "Clean" },
    "task-4": { id: "task-4", content: "Apply for job" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

const BoardContext = createContext<ContextValue>(null);

export default BoardContext;
