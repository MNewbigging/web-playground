import { observer } from 'mobx-react';
import React from 'react';

import { TLCheckListItemData } from '../../../model/TLTodo';
import { TLChecklistItem } from './TLChecklistInputItem';
import { TLChecklistInputState } from './TLChecklistInputState';
import { TLCompleteButton } from './TLCompleteButton';

import './tl-checklist-input.scss';

interface CLProps {
  existingItems: TLCheckListItemData[];
  onOpenClose: (val: boolean) => void;
  onChange: (items: TLCheckListItemData[]) => void;
}

@observer
export class TLChecklistInput extends React.PureComponent<CLProps> {
  private readonly clState = new TLChecklistInputState(this.props.existingItems);
  public render() {
    const mode = this.clState.active ? 'active' : 'inactive';
    return (
      <div className={'tl-checklist-input ' + mode} onClick={this.onCreateChecklist}>
        {this.clState.active ? this.renderChecklistInput() : <div>CREATE_CHECKLIST</div>}
      </div>
    );
  }

  private readonly onCreateChecklist = () => {
    this.clState.openCli();
    this.props.onOpenClose(this.clState.active);
  };

  private renderChecklistInput() {
    return (
      <div className={'cl-input'} onClick={this.onCloseChecklist}>
        {this.clState.items.map((item, i) => (
          <TLChecklistItem
            key={'cli-' + i}
            itemText={item.text}
            onChange={(val: string) => this.onItemChange(item, val)}
            onRemove={() => this.onItemRemove(item)}
          />
        ))}
        <div className={'add-item'}>
          <TLCompleteButton
            complete={false}
            onChange={(_val: boolean) => this.clState.addNewItem()}
          />
        </div>
      </div>
    );
  }

  private readonly onItemChange = (item: TLCheckListItemData, val: string) => {
    this.clState.setItemText(item, val);
    this.props.onChange(this.clState.items);
  };

  private readonly onItemRemove = (item: TLCheckListItemData) => {
    this.clState.removeItem(item);
    this.props.onChange(this.clState.items);
  };

  private readonly onCloseChecklist = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.clState.tryCloseCli();
    this.props.onOpenClose(this.clState.active);
    event.stopPropagation();
  };
}
