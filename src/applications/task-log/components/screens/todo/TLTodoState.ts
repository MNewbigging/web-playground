import { ChangeType } from '../../../store/TLBaseStore';
import { TLTodoStoreContext, todoStore } from '../../../store/TLTodoStore';
export class TLTodoState {
  constructor() {
    todoStore.registerListener(TLTodoStoreContext.TODOS, this.todoListener);
  }

  private readonly todoListener = (changeType: ChangeType, id?: string) => {
    switch (changeType) {
      case ChangeType.LOAD:
        //
        break;
      case ChangeType.CREATE:
        //
        break;
      case ChangeType.UPDATE:
        //
        break;
      case ChangeType.DELETE:
        //
        break;
    }
  };
}
