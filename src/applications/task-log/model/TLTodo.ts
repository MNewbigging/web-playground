export enum TLPriority {
  LOW,
  MID,
  HI,
}

export interface TLCheckListItemData {
  text: string;
  completed: boolean;
}

export interface ITodo {
  id: string;
  title: string;
  description: string;
  checklistItems: TLCheckListItemData[];
  priority: TLPriority;
  tracked: boolean;
  created: string;
  completed: boolean;
  completedDate: string;
  // recurring
  // deadline
}
