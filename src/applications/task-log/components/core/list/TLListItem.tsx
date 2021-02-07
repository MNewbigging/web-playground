import React from 'react';

import { ITodo } from '../../../model/TLTodo';

import Untracked from '../../../../../../dist/assets/task-log/Untracked.svg';
import Tracked from '../../../../../../dist/assets/task-log/Tracked.svg';
import HiPriority from '../../../../../../dist/assets/task-log/HiPriority.svg';

import './tl-list-item.scss';

interface TLItemProps {
  todo: ITodo;
}

export class TLListItem extends React.PureComponent<TLItemProps> {
  public render() {
    const { title } = this.props.todo;
    return (
      <div className={'tl-list-item'}>
        <div className={'title'}>{title}</div>
        <div className={'tracking'}>
          <Tracked />
        </div>
        <div className={'priority'}>
          <HiPriority />
        </div>
      </div>
    );
  }
}
