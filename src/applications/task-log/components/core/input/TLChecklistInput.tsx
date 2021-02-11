import { observer } from 'mobx-react';
import React from 'react';

import { TLChecklistInputState } from './TLChecklistInputState';
import { TLChecklistItem } from './TLChecklistItem';

import './tl-checklist-input.scss';
import { TLCompleteButton } from './TLCompleteButton';

interface CLProps {
  existingItems: string[];
  onOpenClose: (val: boolean) => void;
  onChange: (items: string[]) => void;
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
        {this.clState.items.map((item) => (
          <TLChecklistItem
            key={item.id}
            item={item}
            onChange={(val: string) => this.onItemChange(item.id, val)}
            onRemove={() => this.clState.removeItem(item.id)}
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

  private readonly onItemChange = (id: string, val: string) => {
    this.clState.setItemText(id, val);
    this.props.onChange(this.clState.items.map((item) => item.text));
  };

  private readonly onCloseChecklist = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.clState.tryCloseCli();
    this.props.onOpenClose(this.clState.active);
    event.stopPropagation();
  };
}
