import { action, observable } from 'mobx';

import { TLCheckListItemData } from '../../../model/TLTodo';

export class TLChecklistInputState {
  @observable public active = false;
  @observable public items: TLCheckListItemData[] = [];

  constructor(existingItems: TLCheckListItemData[]) {
    existingItems.forEach((item) => {
      this.items.push({
        text: item.text,
        completed: item.completed,
      });
    });

    if (this.items.length) {
      this.active = true;
    }
  }

  @action public openCli() {
    this.active = true;
  }

  @action public tryCloseCli() {
    if (!this.items.length) {
      this.active = false;
    }
  }

  @action public addNewItem() {
    const newItem: TLCheckListItemData = {
      text: '',
      completed: false,
    };
    this.items.push(newItem);
  }

  @action public removeItem(item: TLCheckListItemData) {
    this.items = this.items.filter((current) => current !== item);
  }

  @action public setItemText(item: TLCheckListItemData, text: string) {
    item.text = text;
  }
}
