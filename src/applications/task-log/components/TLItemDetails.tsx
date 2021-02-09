import { observer } from 'mobx-react';
import React from 'react';

import { ITodo } from '../model/TLTodo';

import { tlDatabase } from '../store/TLDatabase';
import { TLTrackerButton } from './core/input/TLTrackerButton';
import { TLPriorityIcon } from './core/TLPriorityIcon';

import CompleteIcon from '../../../../dist/assets/task-log/bp.svg';

import './tl-item-details.scss';

interface DetailsProps {
  todo?: ITodo;
}

@observer
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
        <div className={'title'}>{todo.title}</div>

        <div className={'complete'}>
          <CompleteIcon />
        </div>
        <div className={'tracking'}>
          <TLTrackerButton tracked={todo.tracked} onChange={this.onTrackIconClick} />
        </div>
        <div className={'priority'}>
          <div className={'icon-container'}>
            <TLPriorityIcon priority={todo.priority} />
          </div>
        </div>

        <div className={'description-box'}>{todo.description}</div>
      </>
    );
  }

  private readonly onTrackIconClick = (val: boolean) => {
    const { todo } = this.props;
    todo.tracked = val;
    tlDatabase.updateTodo(todo);
  };
}
