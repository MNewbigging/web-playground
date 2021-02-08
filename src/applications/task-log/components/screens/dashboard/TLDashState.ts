import { action, observable } from 'mobx';

import { ITodo } from '../../../model/TLTodo';
import { ChangeType } from '../../../store/TLBaseStore';
import { TLTodoStoreContext, todoStore } from '../../../store/TLTodoStore';

export class TLDashState {
  @observable public trackedTodos: ITodo[] = [];
  @observable public recentTodos: ITodo[] = [];

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

    // If todo is tracked
    if (todo.tracked) {
      this.trackedTodos.push(todo);
    }

    // If todo is recent (made yesterday or today)
    if (this.todoIsRecent(todo)) {
      this.recentTodos.push(todo);
    }
  }

  @action private onUpdateTodo(id?: string) {
    const todo = todoStore.getTodo(id);
    if (!todo) {
      return;
    }

    this.updateTrackedTodos(todo);
    this.updateRecentTodos(todo);
  }

  @action private updateTrackedTodos(todo: ITodo) {
    const currentTodoIdx = this.trackedTodos.findIndex((current) => current.id === todo.id);
    if (todo.tracked) {
      if (currentTodoIdx > -1) {
        // Props have changed - update
        this.trackedTodos[currentTodoIdx] = todo;
      } else {
        // Newly tracked - add it
        this.trackedTodos.push(todo);
      }
    } else {
      if (currentTodoIdx > -1) {
        // Newly untracked - lose it
        this.trackedTodos = this.trackedTodos.filter((current) => current.id !== todo.id);
      }
    }
  }

  @action private updateRecentTodos(todo: ITodo) {
    const idx = this.recentTodos.findIndex((current) => current.id === todo.id);
    if (idx < 0) {
      return;
    }

    this.recentTodos[idx] = todo;
  }

  private todoIsRecent(todo: ITodo): boolean {
    const dayCreated = parseInt(todo.created.split('/')[0], 10);
    const today = new Date().getDate();
    if (today - dayCreated <= 1) {
      return true;
    }

    return false;
  }
}
