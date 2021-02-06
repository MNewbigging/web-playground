import { observer } from 'mobx-react';
import React from 'react';

import { TLHeader } from './components/TLHeader';
import { TLNavbar } from './components/TLNavbar';
import { TaskLogState } from './TaskLogState';

import './task-log.scss';

@observer
export class TaskLog extends React.Component {
  private readonly tlState = new TaskLogState();
  public render() {
    return (
      <div className={'tl-background'}>
        <TLHeader time={this.tlState.timeStr} />
        <TLNavbar tlState={this.tlState} />
        <div className={'tl-content'}></div>
      </div>
    );
  }
}
