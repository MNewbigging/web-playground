import React from 'react';

import { ITodo, TLPriority } from '../model/TLTodo';

import CompleteIcon from '../../../../dist/assets/task-log/bp.svg';
import HiPriority from '../../../../dist/assets/task-log/HiPriority.svg';
import LowPriority from '../../../../dist/assets/task-log/LowPriority.svg';
import MidPriority from '../../../../dist/assets/task-log/MidPriority.svg';
import Tracked from '../../../../dist/assets/task-log/Tracked.svg';
import Untracked from '../../../../dist/assets/task-log/Untracked.svg';

import './tl-item-details.scss';

interface DetailsProps {
  todo?: ITodo;
}

export class TLItemDetails extends React.PureComponent<DetailsProps> {
  public render() {
    const { todo } = this.props;
    return (
      <div className={'tl-item-details'}>
        {todo === undefined ? this.renderSelectionMessage() : this.renderItemDetails()}
      </div>
    );
  }

  private renderSelectionMessage() {
    return <div className={'title-bar'}>Select an item...</div>;
  }

  private renderItemDetails() {
    const { todo } = this.props;
    return (
      <>
        <div className={'title-bar'}>
          <div className={'title'}>{todo.title}</div>
          <div className={'icon-bar'}>
            <div className={'complete'}>
              <CompleteIcon />
            </div>
            <div className={'tracked'}>{this.getTrackingIcon(todo.tracked)}</div>
            <div className={'priority'}>{this.getPriorityIcon(todo.priority)}</div>
          </div>
        </div>
        <div className={'description-box'}>{todo.description}</div>
      </>
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
