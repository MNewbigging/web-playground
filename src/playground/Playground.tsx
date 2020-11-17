import React from 'react';

import { observer } from 'mobx-react';

import { WordBash } from '../applications/word-bash/WordBash';
import { AppList } from './AppList';
import { AppState, PlaygroundState } from './PlaygroundState';

@observer
export class Playground extends React.Component {
  private pgState = new PlaygroundState();
  public render() {
    switch (this.pgState.appState) {
      case AppState.PLAYGROUND:
        return <AppList pgState={this.pgState} />;
      case AppState.WORD_BASH:
        return <WordBash toApp={() => this.pgState.toApp(AppState.PLAYGROUND)} />;
    }
  }
}
