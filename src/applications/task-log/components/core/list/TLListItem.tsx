import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { Todo } from '../../../model/TLTodo';
import { tlDatabase } from '../../../store/TLDatabase';
import { TLTodoChangeActions } from '../../../store/TLTodoChangeActions';
import { tlDialogsState } from '../../dialogs/TLDialogsState';
import { TLCompleteButton } from '../input/TLCompleteButton';
import { TLTrackerButton } from '../input/TLTrackerButton';
import { TLPriorityIcon } from '../TLPriorityIcon';

import './tl-list-item.scss';

interface TLItemProps {
  todo: Todo;
  onSelect?: () => void;
  selected?: boolean;
}

@observer
@ContextMenuTarget
export class TLListItem extends React.Component<TLItemProps> {
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

  public renderContextMenu() {
    return (
      <Menu className={'li-context-menu'}>
        <MenuItem className={'context-menu-item'} text={'EDIT_ITEM'} onClick={this.onContextEdit} />
        <MenuItem
          className={'context-menu-item'}
          text={'DELETE_ITEM'}
          onClick={this.onContextDelete}
        />
      </Menu>
    );
  }

  private readonly onContextEdit = () => {
    tlDialogsState.openEditdialog(this.props.todo);
  };

  private readonly onContextDelete = () => {
    tlDatabase.deleteTodo(this.props.todo.id);
  };

  private readonly onCompleteIconClick = (val: boolean) => {
    const { todo } = this.props;
    TLTodoChangeActions.updateTodoCompleted(todo.toDto(), val);
  };

  private readonly onTrackIconClick = (val: boolean) => {
    const { todo } = this.props;
    TLTodoChangeActions.updateTodoTracked(todo.toDto(), val);
  };
}
