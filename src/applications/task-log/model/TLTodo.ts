export enum TLPriority {
  LOW,
  MID,
  HI,
}

export interface ITodo {
  id: string;
  title: string;
  description: string;
  priority: TLPriority;
  tracked: boolean;
  created: string;
  // recurring
  // deadline
}
