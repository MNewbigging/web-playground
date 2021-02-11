import { action, observable } from 'mobx';

import { RandomId } from '../../../../lib/RandomId';
import { ITodo, TLCheckListItemData, TLPriority } from '../../model/TLTodo';

export class TLEditItemState {
  @observable public title: string;
  @observable public description: string;
  @observable public priority: TLPriority;
  @observable public tracked: boolean;
  @observable public checklistInputActive = false;
  public checklistItems: TLCheckListItemData[];

  private readonly id: string;
  private readonly created: string;

  constructor(private readonly todo?: ITodo) {
    if (todo === undefined) {
      this.id = RandomId.newId(5);
      this.title = '';
      this.description = '';
      this.priority = TLPriority.MID;
      this.tracked = false;
      this.checklistItems = [];
    } else {
      this.id = todo.id;
      this.title = todo.title;
      this.description = todo.description;
      this.priority = todo.priority;
      this.tracked = todo.tracked;
      this.created = todo.created;
      this.checklistItems = todo.checklistItems ?? [];
      if (this.checklistItems.length) {
        this.checklistInputActive = true;
      }
    }
  }

  @action public setTitle = (title: string) => {
    this.title = title;
  };

  @action public setDescription = (desc: string) => {
    this.description = desc;
  };

  @action public setPriority = (prio: TLPriority) => {
    this.priority = prio;
  };

  @action public setTracked = (track: boolean) => {
    this.tracked = track;
  };

  @action public setCliState(val: boolean) {
    this.checklistInputActive = val;
  }

  @action public setChecklistItems(items: TLCheckListItemData[]) {
    this.checklistItems = items;
  }

  public getEditedTodo() {
    const dayCreated = this.todo === undefined ? new Date().toUTCString() : this.created;
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      tracked: this.tracked,
      created: dayCreated,
      completed: this.todo?.completed ?? false,
      completedDate: this.todo?.completedDate ?? '',
      checklistItems: this.checklistItems,
    };
  }
}
