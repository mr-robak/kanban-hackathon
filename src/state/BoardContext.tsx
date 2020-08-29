import React, { createContext } from "react";
import { State, ContextValue } from "../models/index";

const initialState = null;

const BoardContext = createContext<ContextValue>(null);

export default BoardContext;
