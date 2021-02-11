import { observer } from 'mobx-react';
import React from 'react';

import { TLCheckListItemData, TLPriority } from '../../model/TLTodo';
import { TLChecklistInput } from '../core/input/TLChecklistInput';
import { TLPriorityInput } from '../core/input/TLPriorityInput';
import { TLTextArea } from '../core/input/TLTextArea';
import { TLTextInput } from '../core/input/TLTextInput';
import { TLTrackerButton } from '../core/input/TLTrackerButton';
import { TLEditItemState } from './TLEditItemState';

import './tl-edit-item.scss';

interface EditProps {
  editState: TLEditItemState;
}

@observer
export class TLEditItem extends React.PureComponent<EditProps> {
  public render() {
    const { editState } = this.props;
    const cliOpen = editState.checklistInputActive ? 'cli-open' : 'cli-closed';
    return (
      <div className={'tl-edit-item ' + cliOpen}>
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
        <div className={'checklist'}>
          <TLChecklistInput
            existingItems={editState.checklistItems}
            onOpenClose={(val: boolean) => editState.setCliState(val)}
            onChange={(items: TLCheckListItemData[]) => editState.setChecklistItems(items)}
          />
        </div>
      </div>
    );
  }
}
