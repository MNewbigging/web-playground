import { action, observable } from 'mobx';

import { ITodo } from '../../../model/TLTodo';
import { ChangeType } from '../../../store/TLBaseStore';
import { TLTodoStoreContext, todoStore } from '../../../store/TLTodoStore';

export class TLTodoState {
  @observable public todos: ITodo[] = [];

  constructor() {
    todoStore.registerListener(TLTodoStoreContext.TODOS, this.todoListener);
  }

  private readonly todoListener = (changeType: ChangeType, id?: string) => {
    switch (changeType) {
      case ChangeType.LOAD:
        //
        break;
      case ChangeType.CREATE:
        this.onNewTodo(id);
        break;
      case ChangeType.UPDATE:
        this.onUpdateTodo(id);
        break;
      case ChangeType.DELETE:
        //
        break;
    }
  };

  @action private onNewTodo(id?: string) {
    const todo = todoStore.getTodo(id);
    if (!todo) {
      return;
    }

    this.todos.push(todo);
  }

  @action private onUpdateTodo(id?: string) {
    const todo = todoStore.getTodo(id);
    if (!todo) {
      return;
    }

    // Find todo to update
    const toUpdate = this.todos.find((old) => old.id === todo.id);
    if (!toUpdate) {
      return;
    }

    // Copy over any values that might have changed
    todoStore.copyTodo(toUpdate, todo);
  }
}
