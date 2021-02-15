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
    this.completedFilter = undefined;
    this.trackedFilter = undefined;
    this.priorityFilter = TLPriority.NONE;
  }

  @action public setNameFilter(query: string) {
    this.nameFilter = query;
  }

  @action public setCompleteFilter(completed: boolean) {
    if (this.completedFilter === undefined) {
      this.completedFilter = false;
    } else {
      this.completedFilter = completed;
    }
  }

  @action public setTrackedFilter(tracked: boolean) {
    if (this.trackedFilter === undefined) {
      this.trackedFilter = false;
    } else {
      this.trackedFilter = tracked;
    }
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
    if (this.completedFilter !== undefined) {
      filterers.push(this.completedFilterer);
    }

    // Tracked
    if (this.trackedFilter !== undefined) {
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
    console.log(`todo: ${todo.completed} vs this: ${this.completedFilter}`);
    return todo.completed === this.completedFilter;
  };

  private readonly trackedFilterer = (todo: Todo) => {
    return todo.tracked === this.trackedFilter;
  };

  private readonly priorityFilterer = (todo: Todo) => {
    return todo.priority === this.priorityFilter;
  };
}
