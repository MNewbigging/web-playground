import React from 'react';

import { ITodo, TLPriority } from '../../../model/TLTodo';

import HiPriority from '../../../../../../dist/assets/task-log/HiPriority.svg';
import LowPriority from '../../../../../../dist/assets/task-log/LowPriority.svg';
import MidPriority from '../../../../../../dist/assets/task-log/MidPriority.svg';
import Tracked from '../../../../../../dist/assets/task-log/Tracked.svg';
import Untracked from '../../../../../../dist/assets/task-log/Untracked.svg';

import './tl-list-item.scss';

interface TLItemProps {
  todo: ITodo;
}

export class TLListItem extends React.PureComponent<TLItemProps> {
  public render() {
    const { title, priority } = this.props.todo;
    return (
      <div className={'tl-list-item'}>
        <div className={'title'}>{title}</div>
        <div className={'tracking'}>{this.getTrackingIcon(true)}</div>
        <div className={'priority'}>{this.getPriorityIcon(priority)}</div>
      </div>
    );
  }

  private getTrackingIcon(tracked: boolean) {
    return tracked ? <Tracked /> : <Untracked />;
  }

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
