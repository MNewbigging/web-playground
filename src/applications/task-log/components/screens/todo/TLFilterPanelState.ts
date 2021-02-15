import { action, observable } from 'mobx';
import { TLPriority } from '../../../model/TLTodo';

export class TLFilterPanelState {
  @observable public nameFilter = '';
  @observable public completedFilter = false;
  @observable public trackedFilter = false;
  @observable public priorityFilter = TLPriority.NONE;

  @observable public completedSort = false;
  @observable public trackedSort = false;
  @observable prioritySort = TLPriority.NONE;

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
}
