import { observer } from 'mobx-react';
import React from 'react';

import { ITodo, TLPriority } from '../model/TLTodo';

import { tlDatabase } from '../store/TLDatabase';
import { TLPriorityInput } from './core/input/TLPriorityInput';
import { TLTrackerButton } from './core/input/TLTrackerButton';
import { TLCompleteButton } from './core/input/TLCompleteButton';

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
          <TLCompleteButton complete={todo.completed} onChange={this.onCompleteIconClick} />
        </div>
        <div className={'tracking'}>
          <TLTrackerButton tracked={todo.tracked} onChange={this.onTrackIconClick} />
        </div>
        <div className={'priority'}>
          <TLPriorityInput priority={todo.priority} onSelect={this.onPriorityClick} />
        </div>

        <div className={'description-box'}>{todo.description}</div>
      </>
    );
  }

  // TODO - do edits on a new todo and send that to avoid re-renders when editing existing todo
  private readonly onCompleteIconClick = (val: boolean) => {
    const { todo } = this.props;
    todo.completed = val;
    tlDatabase.updateTodo(todo);
  };

  private readonly onTrackIconClick = (val: boolean) => {
    const { todo } = this.props;
    todo.tracked = val;
    tlDatabase.updateTodo(todo);
  };

  private readonly onPriorityClick = (prio: TLPriority) => {
    const { todo } = this.props;
    todo.priority = prio;
    tlDatabase.updateTodo(todo);
  };
}
