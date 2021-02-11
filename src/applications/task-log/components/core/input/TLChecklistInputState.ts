import { action, observable } from 'mobx';
import { RandomId } from '../../../../../lib/RandomId';

export interface IChecklistItem {
  id: string;
  text: string;
}

export class TLChecklistInputState {
  @observable public active = false;
  @observable public items: IChecklistItem[] = [];

  constructor(existingItems: string[]) {
    existingItems.forEach((item, i) => {
      this.items.push({
        id: i.toString(),
        text: item,
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
    const newItem: IChecklistItem = {
      id: RandomId.newId(4),
      text: '',
    };
    this.items.push(newItem);
  }

  @action public removeItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  @action public setItemText(id: string, text: string) {
    const itemToUpdate = this.items.find((item) => item.id === id);
    if (itemToUpdate) {
      itemToUpdate.text = text;
    }
  }
}
