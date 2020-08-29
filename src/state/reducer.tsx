import { Action, State } from "../models/index";

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
      return state;
    }
    default: {
      return state;
    }
  }
}
