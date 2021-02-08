import { ITodo } from '../model/TLTodo';
import { ChangeType, Listener, TLBaseStore } from './TLBaseStore';

export enum TLTodoStoreContext {
  TODOS,
}

class TLTodoStore extends TLBaseStore<TLTodoStoreContext> {
  public allTodos: ITodo[] = [];

  reportIfLoaded(_context: TLTodoStoreContext, callback: Listener) {
    if (this.allTodos.length) {
      callback(ChangeType.LOAD);
    }
  }

  public getTodo(id: string) {
    return this.allTodos.find((todo) => todo.id === id);
  }

  public addTodo(todo: ITodo) {
    this.allTodos.push(todo);
    this.notifyListeners(TLTodoStoreContext.TODOS, ChangeType.CREATE, todo.id);
  }

  public updateTodo(replacement: ITodo) {
    this.allTodos = this.allTodos.map((current) =>
      current.id === replacement.id ? replacement : current
    );
    this.notifyListeners(TLTodoStoreContext.TODOS, ChangeType.UPDATE, replacement.id);
  }
}

export const todoStore = new TLTodoStore();
