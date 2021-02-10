import { action, observable } from 'mobx';

import { ITodo } from '../../../model/TLTodo';
import { ChangeType } from '../../../store/TLBaseStore';
import { TLTodoStoreContext, todoStore } from '../../../store/TLTodoStore';
import { tlDialogsState } from '../../dialogs/TLDialogsState';

export class TLDashState {
  @observable public trackedTodos: ITodo[] = [];
  @observable public recentTodos: ITodo[] = [];

  @observable public selectedTodo?: ITodo;

  constructor() {
    todoStore.registerListener(TLTodoStoreContext.TODOS, this.todoListener);
  }

  @action public selectTrackedTodo(id: string) {
    const todo = this.trackedTodos.find((item) => item.id === id);
    if (todo) {
      this.selectedTodo = todo;
      tlDialogsState.openDetailsDialog(todo);
    }
  }

  @action public selectRecentTodo(id: string) {
    const todo = this.recentTodos.find((item) => item.id === id);
    if (todo) {
      this.selectedTodo = todo;
      tlDialogsState.openDetailsDialog(todo);
    }
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

    tlDialogsState.updateDetailsDialogTodo(todo);
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
    const today = new Date();
    const created = new Date(todo.created);
    const dayInMs = 86400000;

    if (today.getTime() - created.getTime() <= dayInMs) {
      return true;
    }

    return false;
  }
}
