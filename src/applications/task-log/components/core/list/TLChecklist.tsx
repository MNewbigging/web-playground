import { observer } from 'mobx-react';
import React from 'react';
import { TLCompleteButton } from '../input/TLCompleteButton';

import './tl-checklist.scss';

interface ChecklistProps {
  items: string[];
}

@observer
export class TLChecklist extends React.PureComponent<ChecklistProps> {
  public render() {
    const { items } = this.props;
    return (
      <div className={'checklist'}>
        {items.map((item, i) => this.renderListItem(item, i.toString()))}
      </div>
    );
  }

  private renderListItem(item: string, key: string) {
    return (
      <div key={key} className={'li'}>
        <div className={'complete-icon'}>
          <TLCompleteButton complete={false} onChange={() => console.log('clicked bp item')} />
        </div>
        <div className={'item-text'}>{item}</div>
      </div>
    );
  }
}
