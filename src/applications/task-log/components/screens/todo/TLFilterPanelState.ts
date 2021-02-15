import { action, observable } from 'mobx';
import { TLPriority, Todo } from '../../../model/TLTodo';

export type Filterer = (todo: Todo) => boolean;

export class TLFilterPanelState {
  @observable public nameFilter = '';
  @observable public completedFilter?: boolean;
  @observable public trackedFilter?: boolean;
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

    // For name, if applicable
    if (this.nameFilter) {
      filterers.push(this.nameFilterer);
    }

    // Completed
    if (this.completedFilter) {
      filterers.push(this.completedFilterer);
    }

    // Tracked
    if (this.trackedFilter) {
      filterers.push(this.trackedFilterer);
    }

    // Priority
    if (this.priorityFilter !== TLPriority.NONE) {
      filterers.push(this.priorityFilterer);
    }

    return filterers;
  }

  private readonly nameFilterer = (todo: Todo) => {
    return todo.title.toLowerCase().includes(this.nameFilter.toLowerCase());
  };

  private readonly completedFilterer = (todo: Todo) => {
    return todo.completed === this.completedFilter;
  };

  private readonly trackedFilterer = (todo: Todo) => {
    return todo.tracked === this.trackedFilter;
  };

  private readonly priorityFilterer = (todo: Todo) => {
    return todo.priority === this.priorityFilter;
  };
}
