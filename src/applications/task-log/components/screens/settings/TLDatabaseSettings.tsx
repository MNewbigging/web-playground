import React from 'react';

import { tlDatabase } from '../../../store/TLDatabase';
import { TLTodoChangeActions } from '../../../store/TLTodoChangeActions';
import { TLButton, TLButtonIntent } from '../../core/TLButton';

import './tl-database-settings.scss';

export class TLDatabaseSettings extends React.PureComponent {
  public render() {
    return (
      <div className={'db-settings'}>
        <div className={'setting-item'}>
          <div>Delete all completed items</div>
          <TLButton
            className={'button'}
            intent={TLButtonIntent.REJECT}
            text={'DELETE'}
            onClick={this.handleDeleteCompleted}
          />
        </div>
        <div className={'setting-item'}>
          <div>Clear database and restart</div>
          <TLButton
            className={'button'}
            intent={TLButtonIntent.REJECT}
            text={'RESET'}
            onClick={this.handleDatabaseReset}
          />
        </div>
      </div>
    );
  }

  private readonly handleDatabaseReset = () => {
    tlDatabase.reset();
  };

  private readonly handleDeleteCompleted = () => {
    TLTodoChangeActions.deleteAllCompletedTodos();
  };
}
