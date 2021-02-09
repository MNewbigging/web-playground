import { observer } from 'mobx-react';
import React from 'react';

import { ITodo, TLPriority } from '../../../model/TLTodo';
import { tlDatabase } from '../../../store/TLDatabase';
import { TLTrackerButton } from '../input/TLTrackerButton';

import HiPriority from '../../../../../../dist/assets/task-log/HiPriority.svg';
import LowPriority from '../../../../../../dist/assets/task-log/LowPriority.svg';
import MidPriority from '../../../../../../dist/assets/task-log/MidPriority.svg';

import './tl-list-item.scss';

interface TLItemProps {
  todo: ITodo;
  onSelect?: () => void;
  selected?: boolean;
}

@observer
export class TLListItem extends React.PureComponent<TLItemProps> {
  public render() {
    const { todo, onSelect, selected } = this.props;
    const { title, priority, tracked } = todo;
    const trackedClass = tracked ? 'tracked' : 'untracked';
    const selectedClass = selected ? 'selected' : '';

    return (
      <div className={'tl-list-item ' + selectedClass} onClick={() => onSelect()}>
        <div className={'title'}>{title}</div>
        <TLTrackerButton tracked={tracked} onChange={this.onTrackIconClick} />
        <div className={'priority ' + trackedClass}>{this.getPriorityIcon(priority)}</div>
      </div>
    );
  }

  private readonly onTrackIconClick = (val: boolean) => {
    const { todo } = this.props;
    // Causes icon to change before item disappears; two renders
    todo.tracked = val;
    tlDatabase.updateTodo(todo);
  };

  private getPriorityIcon(prio: TLPriority) {
    switch (prio) {
      case TLPriority.HI:
        return <HiPriority />;
      case TLPriority.MID:
        return <MidPriority />;
      case TLPriority.LOW:
        return <LowPriority />;
    }
  }
}
