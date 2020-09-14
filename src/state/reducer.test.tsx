import reducer from "./reducer";
import { initialState } from "./BoardContext";

describe("reducer", () => {
  describe("if given an invalid action type", () => {
    test("return initial state", () => {
      const newState = reducer(initialState, {
        type: "multuplyColumn",
        payload: null,
      });
      expect(newState).toEqual(initialState);
    });
  });
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
  describe("if given action type addTask", () => {
    test("return state with new task added", () => {
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
          taskIds: ["task-5"],
        },
      };
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
        "task-5": {
          id: "task-5",
          title: "Edit title",
          description: "Add task's details",
          imageId: null,
        },
      };

      const newState = reducer(initialState, {
        type: "addTask",
        payload: "column-3",
      });
      expect(Object.keys(newState.columns)).toHaveLength(3);
      expect(Object.keys(newState.tasks)).toHaveLength(5);
      expect(newState.tasks["task-5"].id).toBe("task-5");
      expect(newState.tasks).toEqual(newTasks);
      expect(newState.columns).toEqual(newColumns);
    });
  });
  describe("if given action type deleteTask", () => {
    test("return state with task deleted", () => {
      const newColumns = {
        "column-1": {
          id: "column-1",
          title: "To do",
          taskIds: ["task-1"],
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
      };
      const newTasks = {
        "task-1": {
          id: "task-1",
          title: "Start Reading These Cards!",
          description:
            "These cards provide information on how to use The True Kanban Board",
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
      };

      const newState = reducer(initialState, {
        type: "deleteTask",
        payload: "task-2",
      });
      expect(Object.keys(newState.columns)).toHaveLength(3);
      expect(Object.keys(newState.tasks)).toHaveLength(3);
      expect(newState.tasks).toEqual(newTasks);
      expect(newState.columns).toEqual(newColumns);
    });
  });

  describe("if given action type reset", () => {
    test("return initial state", () => {
      const newState = reducer(initialState, {
        type: "reset",
        payload: null,
      });
      expect(newState.columns).toEqual(initialState.columns);
      expect(newState.columnOrder).toEqual(initialState.columnOrder);
      expect(newState.tasks).toEqual(initialState.tasks);
    });
  });

  describe("if given action type newCardTitle and a valid task-id", () => {
    test("return state with new card title included", () => {
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
          title: "New Title",
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
      };

      const newState = reducer(initialState, {
        type: "newCardTitle",
        payload: { id: "task-2", newTitle: "New Title" },
      });

      expect(newState.columns).toEqual(initialState.columns);
      expect(newState.columnOrder).toEqual(initialState.columnOrder);
      expect(newState.tasks).toEqual(newTasks);
    });
  });
  describe("if given action type newCardTitle and an ivalid task-id", () => {
    test("return task state unchanged", () => {
      const newState = reducer(initialState, {
        type: "newCardTitle",
        payload: { id: "task-7", newTitle: "New Title" },
      });

      expect(newState.columns).toEqual(initialState.columns);
      expect(newState.columnOrder).toEqual(initialState.columnOrder);
      expect(newState.tasks).toEqual(initialState.tasks);
    });
  });
});
