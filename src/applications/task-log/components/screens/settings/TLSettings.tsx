import React from 'react';

import { TLPanel } from '../../core/TLPanel';
import { TLDatabaseSettings } from './TLDatabaseSettings';

import './tl-settings.scss';

export class TLSettings extends React.PureComponent {
  public render() {
    return (
      <div className={'tl-settings'}>
        <TLPanel className={'data-panel'} title={'DATABASE_SETTINGS'}>
          <TLDatabaseSettings />
        </TLPanel>
      </div>
    );
  }
}
