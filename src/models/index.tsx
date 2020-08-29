export interface Action {
  type: string;
  payload: any;
}

export interface Column {
  id: number;
  name: string;
  cards: Array<Card>;
}

export interface Card {
  id: number;
  title: string;
  description: string;
}

// export type State = Array<Column>;

interface task {
  id: string;
  title: string;
  description: string;
}

interface column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface State {
  tasks: { [key: string]: task };
  columns: { [key: string]: column };
  columnOrder: string[];
}

export type ContextValue =
  | { state: State; dispatch: React.Dispatch<Action> }
  | State;
