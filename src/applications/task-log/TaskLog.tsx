import { observer } from 'mobx-react';
import React from 'react';

import { TLHeader } from './components/TLHeader';
import { TLPanel } from './components/TLPanel';
import { TaskLogState } from './TaskLogState';

import './task-log.scss';

@observer
export class TaskLog extends React.Component {
  private readonly tlState = new TaskLogState();
  public render() {
    return (
      <div className={'tl-background'}>
        <TLHeader time={this.tlState.timeStr} />
        <TLPanel className={'tl-navbar'}>
          <div>I'm the panel content</div>
        </TLPanel>
        <div className={'tl-content'}></div>
      </div>
    );
  }
}
