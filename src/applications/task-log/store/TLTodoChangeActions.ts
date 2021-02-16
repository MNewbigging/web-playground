import { ITodoDTO, TLPriority, Todo } from '../model/TLTodo';
import { ChangeType } from './TLBaseStore';
import { tlDatabase } from './TLDatabase';
import { todoStore } from './TLTodoStore';

// State -> ChangeActions -> database -> ChangeActions -> Store -> State
// ITodo ->  ITodoDTO     -> ITodoDTO -> ITODO  -> -> ->
// Changes are made on dtos to avoid re-renders when changing todos, and
// because database only stores dtos (obj ref props serialised).

export class TLTodoChangeActions {
  // FROM STATE TO DATABASE
  public static updateTodoCompleted(dto: ITodoDTO, completed: boolean) {
    dto.completed = completed;
    dto.completedDate = new Date().toUTCString();
    dto.tracked = false;
    tlDatabase.updateTodo(dto);
  }

  public static updateTodoTracked(dto: ITodoDTO, tracked: boolean) {
    // Can't track a completed task
    if (!dto.completed) {
      dto.tracked = tracked;
      tlDatabase.updateTodo(dto);
    }
  }

  public static updateTodoPriority(dto: ITodoDTO, priority: TLPriority) {
    dto.priority = priority;
    tlDatabase.updateTodo(dto);
  }

  public static deleteAllCompletedTodos() {
    const ids = todoStore.getAllCompletedTodosIds();
    tlDatabase.bulkDelete(ids);
  }

  // FROM DATABASE TO STORE
  public static crudTodo(changeType: ChangeType, dto: ITodoDTO) {
    const todo = new Todo(dto);
    switch (changeType) {
      case ChangeType.CREATE:
        todoStore.addTodo(todo);
        break;
      case ChangeType.UPDATE:
        todoStore.updateTodo(todo);
        break;
    }
  }

  public static loadTodos(dtos: ITodoDTO[]) {
    // Delete any completed tasks over a week old
    const dayInMs = 86400000;
    const weekInMs = dayInMs * 7;
    const today = new Date().getTime();
    const oldDtoIds: string[] = [];
    const validTodos: Todo[] = [];

    dtos.forEach((dto) => {
      if (dto.completed) {
        const completedDate = new Date(dto.completedDate).getTime();
        if (today - completedDate >= weekInMs) {
          oldDtoIds.push(dto.id);
        }
      } else {
        validTodos.push(new Todo(dto));
      }
    });

    if (oldDtoIds.length) {
      tlDatabase.bulkDelete(oldDtoIds, true);
    }

    todoStore.loadTodos(validTodos);
  }

  // Some reason need this for indexeddb; must get same object back with changed props
  // Rather than an entirely new object
  public static copyTodoValues(old: ITodoDTO, updated: ITodoDTO) {
    old.title = updated.title;
    old.description = updated.description;
    old.checklistItems = updated.checklistItems;
    old.priority = updated.priority;
    old.tracked = updated.tracked;
    old.completed = updated.completed;
    old.completedDate = updated.completedDate;
  }
}
