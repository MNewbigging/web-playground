import { ITodo } from '../model/TLTodo';

import { todoStore } from './TLTodoStore';

class TLDatabase {
  public ready = false;

  private readonly dbName = 'TLDatabase';
  private readonly todoStoreName = 'todoStore';
  private database?: IDBDatabase;

  public reset() {
    console.log('deleting database...');
    const req = indexedDB.deleteDatabase(this.dbName);
    req.onsuccess = (_e: Event) => {
      this.database = undefined;
      console.log('deleted database');
      todoStore.clear();
      this.load();
    };
  }

  public createTodo(todo: ITodo) {
    if (!this.database) {
      return;
    }

    // Open a readwrite transaction
    const transaction = this.database.transaction(this.todoStoreName, 'readwrite');
    transaction.oncomplete = (_e: Event) => {
      todoStore.addTodo(todo);
    };
    transaction.onerror = (_e: Event) => {
      console.error('transaction error ', transaction.error.code);
    };

    // Get store to add to
    const objectStore = transaction.objectStore(this.todoStoreName);

    // Make request to add to that store
    console.log('adding to db: ', todo);
    try {
      objectStore.add(todo);
    } catch (e) {
      console.log('error adding to db: ', e);
    }

    // addReq.onerror = (_e: Event) => console.log('add request error: ', addReq.error.code);
    // addReq.onsuccess = (_e: Event) => {
    //   console.log('added to object store');
    //   const getReq = objectStore.get(todo.id);
    //   getReq.onerror = (_ev: Event) => console.log('get request error: ', getReq.error.code);
    //   getReq.onsuccess = (_ev: Event) => console.log('get request result: ', getReq.result);
    // };
  }

  public updateTodo(todo: ITodo) {
    // Open a readwrite transaction
    const transaction = this.database.transaction(this.todoStoreName, 'readwrite');
    transaction.oncomplete = (_e: Event) => {
      todoStore.updateTodo(todo);
    };
    transaction.onerror = (_e: Event) => {
      console.error('transaction error ', transaction.error.code);
    };

    // Get store to add to
    const objStore = transaction.objectStore(this.todoStoreName);

    // Get the existing todo item first
    const getReq = objStore.get(todo.id);
    getReq.onsuccess = (_e: Event) => {
      // Copy over all values to data from todo that might have changed
      const data: ITodo = getReq.result;
      this.copyTodoValues(data, todo);
      const updateReq = objStore.put(data);
      updateReq.onerror = () => console.log('failed put');
    };
  }

  public load() {
    console.log('loading database...');
    const openRequest = indexedDB.open(this.dbName);
    openRequest.onupgradeneeded = (_e: Event) => {
      console.log('upgrading database...');
      this.database = openRequest.result;
      this.database.createObjectStore(this.todoStoreName, { keyPath: 'id' });
    };
    openRequest.onsuccess = (_e: Event) => {
      this.database = openRequest.result;

      const objStore = this.database
        .transaction(this.todoStoreName, 'readonly')
        .objectStore(this.todoStoreName);

      const getReq = objStore.getAll();
      getReq.onerror = (_ev: Event) => console.log('get all items from db failed');
      getReq.onsuccess = (_ev: Event) => {
        console.log('got items from db: ', getReq.result);
        todoStore.loadTodos(getReq.result);
      };
    };
  }

  private copyTodoValues(old: ITodo, updated: ITodo) {
    // For above update, needs to use same object so must copy values by hand
    old.title = updated.title;
    old.description = updated.description;
    old.checklistItems = updated.checklistItems;
    old.priority = updated.priority;
    old.tracked = updated.tracked;
    old.completed = updated.completed;
    old.completedDate = updated.completedDate;
  }
}

export const tlDatabase = new TLDatabase();
