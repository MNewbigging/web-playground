import { action, observable } from 'mobx';

import { Todo } from '../../../model/TLTodo';
import { ChangeType } from '../../../store/TLBaseStore';
import { TLTodoStoreContext, todoStore } from '../../../store/TLTodoStore';

export class TLTodoState {
  @observable public todos: Todo[] = [];
  @observable public selectedTodo?: Todo;

  constructor() {
    todoStore.registerListener(TLTodoStoreContext.TODOS, this.todoListener);
    todoStore.registerListener(TLTodoStoreContext.CLEAR, this.clearTodosListener);
  }

  @action public selectTodo(id: string) {
    this.selectedTodo = this.todos.find((item) => item.id === id);
  }

  @action private readonly clearTodosListener = (changeType: ChangeType, id?: string) => {
    this.todos = [];
    this.selectedTodo = undefined;
    console.log('deleted items in todo state');
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
    }
  };

  @action private onLoadTodos() {
    todoStore.allTodos.forEach((todo) => this.todos.push(todo));
  }

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

  @action private onDeleteTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
