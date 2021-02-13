import { ITodoDTO } from '../model/TLTodo';
import { ChangeType } from './TLBaseStore';

import { TLTodoChangeActions } from './TLTodoChangeActions';
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
        TLTodoChangeActions.loadTodos(getReq.result);
      };
    };
  }

  public createTodo(todo: ITodoDTO) {
    if (!this.database) {
      return;
    }

    // Open a readwrite transaction
    const transaction = this.database.transaction(this.todoStoreName, 'readwrite');
    transaction.oncomplete = (_e: Event) => {
      TLTodoChangeActions.crudTodo(ChangeType.CREATE, todo);
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
  }

  public updateTodo(todo: ITodoDTO) {
    // Open a readwrite transaction
    const transaction = this.database.transaction(this.todoStoreName, 'readwrite');
    transaction.oncomplete = (_e: Event) => {
      TLTodoChangeActions.crudTodo(ChangeType.UPDATE, todo);
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
      const data: ITodoDTO = getReq.result;
      TLTodoChangeActions.copyTodoValues(data, todo);
      const updateReq = objStore.put(data);
      updateReq.onerror = () => console.log('failed put');
    };
  }

  public deleteTodo(id: string) {
    const objStore = this.database
      .transaction(this.todoStoreName, 'readwrite')
      .objectStore(this.todoStoreName);

    const delReq = objStore.delete(id);
    delReq.onerror = (_ev: Event) => console.log('error deleting item from db');
    delReq.onsuccess = (_ev: Event) => {
      todoStore.deleteTodo(id);
    };
  }

  public bulkDelete(ids: string[]) {
    const transaction = this.database.transaction(this.todoStoreName, 'readwrite');
    transaction.onerror = (_ev: Event) => console.log('error bullk deleting from db');
    transaction.oncomplete = (_ev: Event) => {
      todoStore.bulkDeleteTodos(ids);
    };
    const objStore = transaction.objectStore(this.todoStoreName);
    ids.forEach((id) => {
      objStore.delete(id);
    });
  }
}

export const tlDatabase = new TLDatabase();
