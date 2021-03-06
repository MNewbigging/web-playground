import React from 'react';

import { observer } from 'mobx-react';

import { Blether } from '../applications/blether/Blether';
import { ConnectFour } from '../applications/connect-four/ConnectFour';
import { DeskScene } from '../applications/desk-scene/DeskScene';
import { MemoRune } from '../applications/memo-rune/MemoRune';
import { TaskLog } from '../applications/task-log/TaskLog';
import { WordBash } from '../applications/word-bash/WordBash';
import { AppList } from './AppList';
import { AppState, PlaygroundState } from './PlaygroundState';

@observer
export class Playground extends React.Component {
  private readonly pgState = new PlaygroundState();
  public render() {
    switch (this.pgState.appState) {
      case AppState.PLAYGROUND:
        return <AppList pgState={this.pgState} />;
      case AppState.WORD_BASH:
        return <WordBash toApp={() => this.pgState.toApp(AppState.PLAYGROUND)} />;
      case AppState.DESK_SCENE:
        return <DeskScene toApp={() => this.pgState.toApp(AppState.PLAYGROUND)} />;
      case AppState.MEMO_RUNE:
        return <MemoRune toApp={() => this.pgState.toApp(AppState.PLAYGROUND)} />;
      case AppState.CONNECT_FOUR:
        return <ConnectFour toApp={() => this.pgState.toApp(AppState.PLAYGROUND)} />;
      case AppState.TASK_LOG:
        return <TaskLog toApp={() => this.pgState.toApp(AppState.PLAYGROUND)} />;
      case AppState.BLETHER:
        return <Blether toApp={() => this.pgState.toApp(AppState.PLAYGROUND)} />;
    }
  }
}
