export enum ChangeType {
  LOAD,
  CREATE,
  UPDATE,
  DELETE,
  BULK_DELETE,
}

export type Listener = (changeType: ChangeType, id?: string) => void;

export abstract class TLBaseStore<TContext> {
  public listeners = new Map<TContext, Listener[]>();

  public registerListener(context: TContext, callback: Listener) {
    const currentListeners = this.listeners.get(context) ?? [];
    currentListeners.push(callback);
    this.listeners.set(context, currentListeners);
    this.reportIfLoaded(context, callback);
  }

  protected abstract reportIfLoaded(context: TContext, callback: Listener): void;

  protected notifyListeners(context: TContext, changeType: ChangeType, id?: string) {
    const listeners = this.listeners.get(context);
    listeners.forEach((callback) => {
      callback(changeType, id);
    });
  }

  public abstract clear(): void;
}
