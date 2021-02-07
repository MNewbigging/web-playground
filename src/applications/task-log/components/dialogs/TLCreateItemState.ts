import { action, observable } from 'mobx';

import { RandomId } from '../../../../lib/RandomId';
import { ITodo } from '../../model/TLTodo';
import { tlDatabase } from '../../store/TLDatabase';

export class TLCreateItemState {
  @observable public title = '';
  @observable public description = '';
  private readonly id = RandomId.newId(5);

  @action public setTitle = (title: string) => {
    this.title = title;
  };

  @action public setDescription = (desc: string) => {
    this.description = desc;
  };

  public createTodoItem() {
    const item: ITodo = {
      id: this.id,
      title: this.title,
      description: this.description,
    };
    tlDatabase.createTodo(item);
  }
}
