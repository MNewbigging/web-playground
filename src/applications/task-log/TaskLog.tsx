import { observer } from 'mobx-react';
import React from 'react';

import { TLAllDialogs } from './components/dialogs/TLAllDialogs';
import { TLDash } from './components/screens/dashboard/TLDash';
import { TLSettings } from './components/screens/settings/TLSettings';
import { TLTodo } from './components/screens/todo/TLTodo';
import { TLHeader } from './components/TLHeader';
import { TLNavbar } from './components/TLNavbar';
import { TaskLogState, TLScreen } from './TaskLogState';

import './task-log.scss';

@observer
export class TaskLog extends React.Component {
  private readonly tlState = new TaskLogState();
  public render() {
    return (
      <div className={'tl-background'}>
        <TLAllDialogs />
        <TLHeader time={this.tlState.timeStr} />
        <TLNavbar tlState={this.tlState} />
        <div className={'tl-content'}>{this.renderContentPanel()}</div>
      </div>
    );
  }

  private renderContentPanel() {
    switch (this.tlState.tlScreen) {
      case TLScreen.DASH:
        return <TLDash dashState={this.tlState.dashState} />;
      case TLScreen.TODO:
        return <TLTodo todoState={this.tlState.todoState} />;
      case TLScreen.SETTINGS:
        return <TLSettings />;
    }
  }
}
