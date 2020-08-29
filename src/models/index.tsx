export interface Action {
  type: string;
  payload: any;
}

interface Task {
  id: string;
  title: string;
<<<<<<< HEAD
  taskIds: string[];
}

export interface Columns {
  [propName: string]: SingleColumn;
=======
  description: string;
>>>>>>> master
}

interface Column {
  id: string;
  title: string;
<<<<<<< HEAD
  description: string;
}

export interface Tasks {
  [propName: string]: SingleTask;
}

export interface State {
  tasks: Tasks;
  columns: Columns;
  columnOrder: string[];
}

type reducerType = { state: State; dispatch: React.Dispatch<Action> };
export type ContextValue = reducerType | any;
=======
  taskIds: string[];
}

export interface State {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

export type ContextValue =
  | { state: State; dispatch: React.Dispatch<Action> }
  | any;
>>>>>>> master
