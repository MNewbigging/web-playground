import React from 'react';

import { TLPanel } from './components/TLPanel';

import './task-log.scss';

export class TaskLog extends React.Component {
  public render() {
    return (
      <div className={'tl-background'}>
        <TLPanel className={'tl-navbar'}>
          <div>I'm the panel content</div>
        </TLPanel>
      </div>
    );
  }
}
