export interface Action {
  type: string;
  payload: any;
}

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface State {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

type reducerType = { state: State; dispatch: React.Dispatch<Action> };
export type ContextValue = reducerType | any;
