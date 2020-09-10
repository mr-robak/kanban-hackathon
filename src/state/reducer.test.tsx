import reducer from "./reducer";
import { initialState } from "./BoardContext";

describe("reducer", () => {
  describe("if given action type addColumn", () => {
    test("return state with new column", () => {
      const newState = reducer(initialState, {
        type: "addColumn",
        payload: null,
      });
      expect(Object.keys(newState.columns).length).toEqual(4);
    });
  });
});
