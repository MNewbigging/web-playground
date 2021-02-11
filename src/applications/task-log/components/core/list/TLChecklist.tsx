import { observer } from 'mobx-react';
import React from 'react';

import { TLCheckListItemData } from '../../../model/TLTodo';
import { TLCompleteButton } from '../input/TLCompleteButton';

import './tl-checklist.scss';

interface ChecklistProps {
  items: TLCheckListItemData[];
}

@observer
export class TLChecklist extends React.PureComponent<ChecklistProps> {
  public render() {
    const { items } = this.props;
    return (
      <div className={'checklist'}>
        {items.length ? items.map((item, i) => this.renderListItem(item, i.toString())) : <></>}
      </div>
    );
  }

  private renderListItem(item: TLCheckListItemData, key: string) {
    return (
      <div key={key} className={'li'}>
        <div className={'complete-icon'}>
          <TLCompleteButton
            complete={item.completed}
            onChange={() => console.log('clicked bp item')}
          />
        </div>
        <div className={'item-text'}>{item.text}</div>
      </div>
    );
  }
}
