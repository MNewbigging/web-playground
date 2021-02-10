import { observer } from 'mobx-react';
import React from 'react';

import { ITodo } from '../../../model/TLTodo';
import { TLCompleteButton } from '../input/TLCompleteButton';
import { tlDatabase } from '../../../store/TLDatabase';
import { TLTrackerButton } from '../input/TLTrackerButton';
import { TLPriorityIcon } from '../TLPriorityIcon';

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
    const { title, priority, tracked, completed } = todo;
    const selectedClass = selected ? 'selected' : '';

    return (
      <div className={'tl-list-item ' + selectedClass} onClick={() => onSelect()}>
        <div className={'title'}>{title}</div>
        <div className={'complete'}>
          <TLCompleteButton complete={completed} onChange={this.onCompleteIconClick} />
        </div>
        <div className={'tracking'}>
          <TLTrackerButton tracked={tracked} onChange={this.onTrackIconClick} />
        </div>
        <div className={'priority'}>
          <TLPriorityIcon priority={priority} />
        </div>
      </div>
    );
  }

  private readonly onCompleteIconClick = (val: boolean) => {
    const { todo } = this.props;
    todo.completed = val;
    todo.completedDate = new Date().toUTCString();
    tlDatabase.updateTodo(todo);
  };

  private readonly onTrackIconClick = (val: boolean) => {
    const { todo } = this.props;
    // Causes icon to change before item disappears; two renders
    // can do edits on a different todo and send that
    todo.tracked = val;
    tlDatabase.updateTodo(todo);
  };
}
