export enum TLPriority {
  LOW,
  MID,
  HI,
}

export interface ITodo {
  id: string;
  title: string;
  description: string;
  // recurring
  // deadline
  // priority
  // bullet list items
  // tracked
}
