import { observer } from 'mobx-react';
import React from 'react';

import { TLPriority } from '../../model/TLTodo';
import { TLPriorityInput } from '../core/input/TLPriorityInput';
import { TLEditItemState } from './TLEditItemState';

import './tl-edit-item.scss';

interface EditProps {
  editState: TLEditItemState;
}

@observer
export class TLEditItem extends React.PureComponent<EditProps> {
  public render() {
    const { editState } = this.props;
    return (
      <div className={'tl-edit-item'}>
        <div className={'title'}></div>

        <div className={'tracking'}></div>

        <div className={'priority'}>
          <TLPriorityInput
            onSelect={(prio: TLPriority) => editState.setPriority(prio)}
            priority={editState.priority}
          />
        </div>

        <div className={'description'}></div>
      </div>
    );
  }
}
