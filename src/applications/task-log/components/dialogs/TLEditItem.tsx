import { observer } from 'mobx-react';
import React from 'react';

import { TLPriority } from '../../model/TLTodo';
import { TLPriorityInput } from '../core/input/TLPriorityInput';
import { TLTextInput } from '../core/input/TLTextInput';
import { TLTrackerButton } from '../core/input/TLTrackerButton';
import { TLEditItemState } from './TLEditItemState';
import { TLTextArea } from '../core/input/TLTextArea';

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
        <div className={'title'}>
          <TLTextInput
            placeholder={'TITLE'}
            onChange={editState.setTitle}
            value={editState.title}
          />
        </div>

        <div className={'tracking'}>
          <TLTrackerButton
            tracked={editState.tracked}
            onChange={(val: boolean) => editState.setTracked(val)}
          />
        </div>

        <div className={'priority'}>
          <TLPriorityInput
            onSelect={(prio: TLPriority) => editState.setPriority(prio)}
            priority={editState.priority}
          />
        </div>

        <div className={'description'}>
          <TLTextArea
            placeholder={'DESCRIPTION'}
            onChange={editState.setDescription}
            value={editState.description}
          />
        </div>
      </div>
    );
  }
}
