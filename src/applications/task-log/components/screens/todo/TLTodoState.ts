import { action, observable } from 'mobx';

import { ITodo } from '../../../model/TLTodo';
import { ChangeType } from '../../../store/TLBaseStore';
import { TLTodoStoreContext, todoStore } from '../../../store/TLTodoStore';

export class TLTodoState {
  @observable public todos: ITodo[] = [];
  @observable public selectedTodo?: ITodo;

  constructor() {
    todoStore.registerListener(TLTodoStoreContext.TODOS, this.todoListener);
  }

  @action public selectTodo(id: string) {
    this.selectedTodo = this.todos.find((item) => item.id === id);
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
    const idx = this.todos.findIndex((old) => old.id === todo.id);
    if (idx < 0) {
      return;
    }
    // Update the todo
    this.todos[idx] = todo;
    // Since new object, update ref to selected if matches new item
    if (this.selectedTodo?.id === todo.id) {
      this.selectedTodo = todo;
    }
  }
}
