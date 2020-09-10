import reducer from "./reducer";
import { initialState } from "./BoardContext";

describe("reducer", () => {
  describe("if given action type addColumn", () => {
    test("return state with new column", () => {
      const newColumns = {
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
        "column-4": {
          id: "column-4",
          title: "Title",
          taskIds: [],
        },
      };
      const newColumnOrder = ["column-1", "column-2", "column-3", "column-4"];
      const newState = reducer(initialState, {
        type: "addColumn",
        payload: null,
      });
      expect(Object.keys(newState.columns)).toHaveLength(4);
      expect(newState.columns["column-4"].id).toBe("column-4");
      expect(newState.columns).toEqual(newColumns);
      expect(newState.columnOrder).toHaveLength(4);
      expect(newState.columnOrder[3]).toBe("column-4");
      expect(newState.columnOrder).toEqual(newColumnOrder);
    });
  });
});
