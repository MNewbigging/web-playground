import { action, observable } from 'mobx';
import { TLPriority, Todo } from '../../../model/TLTodo';

export type Filterer = (todo: Todo) => boolean;

export class TLFilterPanelState {
  @observable public nameFilter = '';
  @observable public completedFilter = false;
  @observable public trackedFilter = false;
  @observable public priorityFilter = TLPriority.NONE;

  @observable public completedSort = false;
  @observable public trackedSort = false;
  @observable prioritySort = TLPriority.NONE;

  @action public clearFilters() {
    this.nameFilter = '';
    this.completedFilter = false;
    this.trackedFilter = false;
    this.priorityFilter = TLPriority.NONE;
  }

  @action public setNameFilter(query: string) {
    this.nameFilter = query;
  }

  @action public setCompleteFilter(completed: boolean) {
    this.completedFilter = completed;
  }

  @action public setTrackedFilter(tracked: boolean) {
    this.trackedFilter = tracked;
  }

  @action public setPriorityFilter(priority: TLPriority) {
    this.priorityFilter = priority;
  }

  public getFilterOperations(): Filterer[] {
    const filterers: Filterer[] = [];

    // For name
    if (this.nameFilter) {
      filterers.push(this.nameFilterer);
    }

    return filterers;
  }

  private readonly nameFilterer = (todo: Todo) => {
    return todo.title.toLowerCase().includes(this.nameFilter.toLowerCase());
  };
}
