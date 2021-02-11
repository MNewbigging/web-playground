import { observer } from 'mobx-react';
import React from 'react';

import { ITodo, TLPriority } from '../model/TLTodo';

import { tlDatabase } from '../store/TLDatabase';
import { TLCompleteButton } from './core/input/TLCompleteButton';
import { TLPriorityInput } from './core/input/TLPriorityInput';
import { TLTrackerButton } from './core/input/TLTrackerButton';
import { tlDialogsState } from './dialogs/TLDialogsState';

import './tl-item-details.scss';
import { TLChecklist } from './core/list/TLChecklist';

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
        <div className={'title'} onClick={this.onEditClick}>
          {todo.title}
        </div>

        <div className={'complete'}>
          <TLCompleteButton complete={todo.completed} onChange={this.onCompleteIconClick} />
        </div>
        <div className={'tracking'}>
          <TLTrackerButton tracked={todo.tracked} onChange={this.onTrackIconClick} />
        </div>
        <div className={'priority'}>
          <TLPriorityInput priority={todo.priority} onSelect={this.onPriorityClick} />
        </div>

        <div className={'description-box'} onClick={this.onEditClick}>
          {todo.description.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <div className={'checklist-box'} onClick={this.onEditClick}>
          <TLChecklist items={todo.checklistItems} />
        </div>
      </>
    );
  }

  private readonly onEditClick = () => {
    tlDialogsState.openEditdialog(this.props.todo);
  };

  // TODO - do edits on a new todo and send that to avoid re-renders when editing existing todo
  private readonly onCompleteIconClick = (val: boolean) => {
    const { todo } = this.props;
    todo.completed = val;
    todo.completedDate = new Date().toUTCString();
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
