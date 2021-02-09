import { observer } from 'mobx-react';
import React from 'react';

import { ITodo, TLPriority } from '../../../model/TLTodo';
import { tlDatabase } from '../../../store/TLDatabase';

import HiPriority from '../../../../../../dist/assets/task-log/HiPriority.svg';
import LowPriority from '../../../../../../dist/assets/task-log/LowPriority.svg';
import MidPriority from '../../../../../../dist/assets/task-log/MidPriority.svg';
import Tracked from '../../../../../../dist/assets/task-log/Tracked.svg';
import Untracked from '../../../../../../dist/assets/task-log/Untracked.svg';

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
        <div className={'tracking ' + trackedClass} onClick={this.onTrackIconClick}>
          {this.getTrackingIcon(tracked)}
        </div>
        <div className={'priority ' + trackedClass}>{this.getPriorityIcon(priority)}</div>
      </div>
    );
  }

  private getTrackingIcon(tracked: boolean) {
    return tracked ? <Tracked /> : <Untracked />;
  }

  private readonly onTrackIconClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    const { todo } = this.props;
    todo.tracked = !todo.tracked;
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
