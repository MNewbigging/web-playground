import { action, observable } from 'mobx';

import { Todo } from '../../../model/TLTodo';
import { ChangeType } from '../../../store/TLBaseStore';
import { TLTodoStoreContext, todoStore } from '../../../store/TLTodoStore';
import { tlDialogsState } from '../../dialogs/TLDialogsState';

export class TLDashState {
  @observable public trackedTodos: Todo[] = [];
  @observable public recentTodos: Todo[] = [];

  @observable public selectedTodo?: Todo;

  constructor() {
    todoStore.registerListener(TLTodoStoreContext.TODOS, this.todoListener);
    todoStore.registerListener(TLTodoStoreContext.CLEAR, this.clearTodosListener);
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

  @action private readonly clearTodosListener = (_changeType: ChangeType, _id?: string) => {
    this.trackedTodos = [];
    this.recentTodos = [];
    this.selectedTodo = undefined;
  };

  private readonly todoListener = (changeType: ChangeType, id?: string) => {
    switch (changeType) {
      case ChangeType.LOAD:
        this.onLoadTodos();
        break;
      case ChangeType.CREATE:
        this.onNewTodo(id);
        break;
      case ChangeType.UPDATE:
        this.onUpdateTodo(id);
        break;
      case ChangeType.DELETE:
        // tslint:disable-next-line: no-unused-expression
        id && this.onDeleteTodo(id);
        break;
      case ChangeType.BULK_DELETE:
        this.clearTodosListener(changeType);
        this.onLoadTodos();
    }
  };

  @action private onLoadTodos() {
    todoStore.allTodos.forEach((todo) => this.addTodo(todo));
  }

  @action private onNewTodo(id?: string) {
    const todo = todoStore.getTodo(id);
    if (!todo) {
      return;
    }

    this.addTodo(todo);
  }

  @action private addTodo(todo: Todo) {
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

  @action private updateTrackedTodos(todo: Todo) {
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

  @action private updateRecentTodos(todo: Todo) {
    const idx = this.recentTodos.findIndex((current) => current.id === todo.id);
    if (idx < 0) {
      return;
    }

    this.recentTodos[idx] = todo;
  }

  @action private onDeleteTodo(id: string) {
    this.trackedTodos = this.trackedTodos.filter((todo) => todo.id !== id);
    this.recentTodos = this.recentTodos.filter((todo) => todo.id !== id);
  }

  private todoIsRecent(todo: Todo): boolean {
    const today = new Date();
    const created = new Date(todo.created);
    const dayInMs = 86400000;

    if (today.getTime() - created.getTime() <= dayInMs) {
      return true;
    }

    return false;
  }
}
