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

export type State = Array<Column>;

export type ContextValue = {state: State; dispatch: React.Dispatch<Action>} | any;
