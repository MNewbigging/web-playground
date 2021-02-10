import React from 'react';

import { tlDatabase } from '../../../store/TLDatabase';
import { TLButton, TLButtonIntent } from '../../core/TLButton';

import './tl-database-settings.scss';

export class TLDatabaseSettings extends React.PureComponent {
  public render() {
    return (
      <div className={'db-settings'}>
        <div>Clear database and restart</div>
        <TLButton
          intent={TLButtonIntent.NEUTRAL}
          text={'RESET'}
          onClick={this.handleDatabaseReset}
        />
      </div>
    );
  }

  private readonly handleDatabaseReset = () => {
    console.log('reset handler');
    tlDatabase.reset();
  };
}
