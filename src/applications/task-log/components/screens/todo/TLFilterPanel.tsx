import { observer } from 'mobx-react';
import React from 'react';

import { TLPriority } from '../../../model/TLTodo';
import { TLCompleteButton } from '../../core/input/TLCompleteButton';
import { TLPriorityInput } from '../../core/input/TLPriorityInput';
import { TLTextInput } from '../../core/input/TLTextInput';
import { TLTrackerButton } from '../../core/input/TLTrackerButton';
import { TLFilterPanelState } from './TLFilterPanelState';

import './tl-filter-panel.scss';

interface FilterProps {
  fpState: TLFilterPanelState;
}

@observer
export class TLFilterPanel extends React.PureComponent<FilterProps> {
  public render() {
    const { fpState } = this.props;
    return (
      <div className={'tl-filter-panel'}>
        <div className={'filter-line'}>
          <div className={'name-input'}>
            <TLTextInput
              placeholder={'NAME'}
              value={fpState.nameFilter}
              onChange={(val: string) => fpState.setNameFilter(val)}
            />
          </div>
          <div className={'icon'}>
            <TLCompleteButton
              complete={fpState.completedFilter}
              onChange={(val: boolean) => fpState.setCompleteFilter(val)}
            />
          </div>
          <div className={'icon'}>
            <TLTrackerButton
              tracked={fpState.trackedFilter}
              onChange={(val: boolean) => fpState.setTrackedFilter(val)}
            />
          </div>
          <div className={'prio'}>
            <TLPriorityInput
              priority={fpState.priorityFilter}
              onSelect={(prio: TLPriority) => fpState.setPriorityFilter(prio)}
            />
          </div>
        </div>
      </div>
    );
  }
}
