import { action, observable } from 'mobx';

import { ITodo } from '../../../model/TLTodo';
import { ChangeType } from '../../../store/TLBaseStore';
import { TLTodoStoreContext, todoStore } from '../../../store/TLTodoStore';

export class TLDashState {
  @observable public trackedTodos: ITodo[] = [];

  constructor() {
    todoStore.registerListener(TLTodoStoreContext.TODOS, this.todoListener);
  }

  private readonly todoListener = (changeType: ChangeType, id?: string) => {
    switch (changeType) {
      case ChangeType.LOAD:
        //
        break;
      case ChangeType.CREATE:
        if (id) {
          this.onNewTodo(id);
        }
        break;
      case ChangeType.UPDATE:
        //
        break;
      case ChangeType.DELETE:
        //
        break;
    }
  };

  @action private onNewTodo(id: string) {
    const todo = todoStore.getTodo(id);
    if (!todo) {
      return;
    }

    // If todo is tracked
    if (todo.tracked) {
      this.trackedTodos.push(todo);
    }
  }
}
