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

  public addTodo(todo: ITodo) {
    this.allTodos.push(todo);
    console.log('added to todo store: ', this.allTodos);
    this.notifyListeners(TLTodoStoreContext.TODOS, ChangeType.CREATE, todo.id);
  }
}

export const todoStore = new TLTodoStore();
