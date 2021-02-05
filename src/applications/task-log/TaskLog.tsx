import React from 'react';

import { TLHeader } from './components/TLHeader';
import { TLPanel } from './components/TLPanel';

import './task-log.scss';

export class TaskLog extends React.Component {
  public render() {
    return (
      <div className={'tl-background'}>
        <TLHeader time={'20:47'} />
        <TLPanel className={'tl-navbar'}>
          <div>I'm the panel content</div>
        </TLPanel>
      </div>
    );
  }
}
