import { ITodo } from '../model/TLTodo';
import { tlDatabase } from './TLDatabase';

class TLTodoStore {
  public allTodos: ITodo[] = [];

  constructor() {
    if (tlDatabase.ready) {
      console.log('db ready');
    } else {
      console.log('db not yet ready');
    }
  }

  public addTodo(todo: ITodo) {
    tlDatabase.createTodo(todo);

    this.allTodos.push(todo);
    console.log('added to todo store: ', this.allTodos);
  }
}

export const todoStore = new TLTodoStore();
