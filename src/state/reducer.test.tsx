import reducer from "./reducer";
import { initialState } from "./BoardContext";

describe("reducer", () => {
  describe("if given action type addColumn", () => {
    test("return state with new column added", () => {
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
  describe("if given action type deleteColumn and a column id as payload", () => {
    test("return state with column deleted", () => {
      const newColumns = {
        "column-1": {
          id: "column-1",
          title: "To do",
          taskIds: ["task-1", "task-2"],
        },
        "column-3": {
          id: "column-3",
          title: "Done",
          taskIds: [],
        },
      };
      const newColumnOrder = ["column-1", "column-3"];
      const newTasks = {
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
      };
      const newState = reducer(initialState, {
        type: "deleteColumn",
        payload: "column-2",
      });
      expect(Object.keys(newState.columns)).toHaveLength(2);
      expect(newState.columns).toEqual(newColumns);
      expect(newState.columnOrder).toHaveLength(2);
      expect(newState.columnOrder).toEqual(newColumnOrder);
      expect(newState.tasks).toEqual(newTasks);
    });
  });
});
