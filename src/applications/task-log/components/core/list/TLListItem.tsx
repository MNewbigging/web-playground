import { observer } from 'mobx-react';
import React from 'react';

import { ITodo } from '../../../model/TLTodo';
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
    const { title, priority, tracked } = todo;
    const trackedClass = tracked ? 'tracked' : 'untracked';
    const selectedClass = selected ? 'selected' : '';

    return (
      <div className={'tl-list-item ' + selectedClass} onClick={() => onSelect()}>
        <div className={'title'}>{title}</div>
        <TLTrackerButton tracked={tracked} onChange={this.onTrackIconClick} />
        <div className={'priority ' + trackedClass}>
          <TLPriorityIcon priority={priority} />
        </div>
      </div>
    );
  }

  private readonly onTrackIconClick = (val: boolean) => {
    const { todo } = this.props;
    // Causes icon to change before item disappears; two renders
    todo.tracked = val;
    tlDatabase.updateTodo(todo);
  };
}
