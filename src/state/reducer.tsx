import { Action, State } from "../models/index";
import { saveState } from "../utils/index";

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case "addColumn": {
      //call saveState(newState) to save to local storage
      return state;
    }
    case "deleteColumn": {
      //call saveState(newState) to save to local storage
      return state;
    }
    case "addCard": {
      //call saveState(newState) to save to local storage
      return state;
    }
    case "deleteCard": {
      //call saveState(newState) to save to local storage
      return state;
    }
    default: {
      return state;
    }
  }
}
