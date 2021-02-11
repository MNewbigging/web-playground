export enum TLPriority {
  LOW,
  MID,
  HI,
}

export interface ITodo {
  id: string;
  title: string;
  description: string;
  checklistItems: string[];
  priority: TLPriority;
  tracked: boolean;
  created: string;
  completed: boolean;
  completedDate: string;
  // recurring
  // deadline
}
