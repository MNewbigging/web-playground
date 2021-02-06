import { ITodo } from '../model/TLTodo';

class TLTodoStore {
  public allTodos: ITodo[] = [];

  public addTodo(todo: ITodo) {
    this.allTodos.push(todo);
    console.log('added to todo store: ', this.allTodos);
  }
}

export const todoStore = new TLTodoStore();
