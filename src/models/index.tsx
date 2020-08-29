export interface Action {
  type: string;
  payload: any;
}

export interface SingleColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface Columns {
  [propName: string]: SingleColumn;
}

export interface SingleTask {
  id: string;
  title: string;
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
