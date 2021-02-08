import { create } from 'domain';
import { action, observable } from 'mobx';

import { RandomId } from '../../../../lib/RandomId';
import { ITodo, TLPriority } from '../../model/TLTodo';
import { tlDatabase } from '../../store/TLDatabase';

export class TLCreateItemState {
  @observable public title = '';
  @observable public description = '';
  @observable public priority = TLPriority.MID;
  @observable public tracked = false;
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

  @action public setTracked = (track: boolean) => {
    this.tracked = track;
  };

  public createTodoItem() {
    const today = new Date();
    const createdDate = today.getDate() + '/' + today.getMonth();
    const item: ITodo = {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      tracked: this.tracked,
      created: createdDate,
    };
    tlDatabase.createTodo(item);
  }
}
