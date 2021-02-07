import { action, observable } from 'mobx';

import { RandomId } from '../../../../lib/RandomId';
import { ITodo, TLPriority } from '../../model/TLTodo';
import { tlDatabase } from '../../store/TLDatabase';

export class TLCreateItemState {
  @observable public title = '';
  @observable public description = '';
  @observable public priority = TLPriority.MID;
  private readonly id = RandomId.newId(5);

  @action public setTitle = (title: string) => {
    this.title = title;
  };

  @action public setDescription = (desc: string) => {
    this.description = desc;
  };

  @action public setPriority = (prio: TLPriority) => {
    this.priority = prio;
  };

  public createTodoItem() {
    const item: ITodo = {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
    };
    tlDatabase.createTodo(item);
  }
}
