import React, { createContext } from "react";
import { Column } from "../models/index";

export const initialState: Array<Column> = [
  {
    id: 1,
    name: "To do",
    cards: [{ id: 1, title: "Make coffee", description: "" }],
  },
  {
    id: 2,
    name: "In Progress",
    cards: [{ id: 2, title: "Build kanban board", description: "" }],
  },
  {
    id: 3,
    name: "Done",
    cards: [{ id: 3, title: "Found awesome team", description: "" }],
  },
];

const BoardContext = createContext<Array<Column>>(initialState);

export default BoardContext;
