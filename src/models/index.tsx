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
