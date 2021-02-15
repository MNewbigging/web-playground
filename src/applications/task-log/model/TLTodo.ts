export enum TLPriority {
  NONE,
  LOW,
  MID,
  HI,
}

export interface TLCheckListItemData {
  text: string;
  completed: boolean;
}

export class Todo {
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

  constructor(dto: ITodoDTO) {
    this.id = dto.id;
    this.title = dto.title;
    this.description = dto.description;
    this.checklistItems = JSON.parse(dto.checklistItems);
    this.priority = dto.priority;
    this.tracked = dto.tracked;
    this.created = dto.created;
    this.completed = dto.completed;
    this.completedDate = dto.completedDate;
  }

  public toDto(): ITodoDTO {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      checklistItems: JSON.stringify(this.checklistItems),
      priority: this.priority,
      tracked: this.tracked,
      created: this.created,
      completed: this.completed,
      completedDate: this.completedDate,
    };
  }
}

// DTO is what's saved to db; can't have obj refs so those are serialised when saving
// and deserialised when loading
export interface ITodoDTO {
  id: string;
  title: string;
  description: string;
  checklistItems: string;
  priority: TLPriority;
  tracked: boolean;
  created: string;
  completed: boolean;
  completedDate: string;
}
