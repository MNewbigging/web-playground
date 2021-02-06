import { ITodo } from '../model/TLTodo';

class TLDatabase {
  public ready = false;

  private readonly dbName = 'TLDatabase';
  private readonly todoStoreName = 'todoStore';
  private database?: IDBDatabase;

  constructor() {
    this.reset();
  }

  public createTodo(todo: ITodo) {
    if (!this.database) {
      return;
    }

    // Open a readwrite transaction
    const transaction = this.database.transaction(this.todoStoreName, 'readwrite');
    transaction.oncomplete = (_e: Event) => console.log('transaction completed');
    transaction.onerror = (_e: Event) => console.log('transaction error ', transaction.error.code);

    // Get store to add to
    const objectStore = transaction.objectStore(this.todoStoreName);

    // Make request to add to that store
    const addReq = objectStore.add(todo);
    addReq.onerror = (_e: Event) => console.log('add request error: ', addReq.error.code);
    addReq.onsuccess = (_e: Event) => {
      console.log('added to object store');
      const getReq = objectStore.get(todo.id);
      getReq.onerror = (_ev: Event) => console.log('get request error: ', getReq.error.code);
      getReq.onsuccess = (_ev: Event) => console.log('get request result: ', getReq.result);
    };
  }

  private load() {
    const openRequest = indexedDB.open(this.dbName);
    openRequest.onupgradeneeded = (_e: Event) => {
      console.log('on upgrade');
      this.database = openRequest.result;
      this.database.createObjectStore(this.todoStoreName, { keyPath: 'id' });
    };
    openRequest.onsuccess = (_e: Event) => {
      console.log('on success');
      this.database = openRequest.result;
      console.log('object stores: ', this.database.objectStoreNames);
    };
  }

  private reset() {
    const req = indexedDB.deleteDatabase(this.dbName);
    req.onsuccess = (_e: Event) => {
      console.log('deleted db');
      this.database = undefined;
      this.load();
    };
  }
}

export const tlDatabase = new TLDatabase();
