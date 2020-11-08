import React from 'react';

import {observer} from 'mobx-react';

import { AppState, PlaygroundState } from './PlaygroundState';

@observer
export class Playground extends React.Component {
  private pgState = new PlaygroundState();
  public render() {
    let toRender: JSX.Element;

    switch(this.pgState.appState) {
      case AppState.PLAYGROUND:
        toRender = <div>Component 1</div>;
        break;
      case AppState.WORD_BASH:
        toRender = <div>Component 2</div>;
        break;
    }

    return (
      <>
        <button onClick={() => this.pgState.setAppState(AppState.PLAYGROUND)}>1</button>
        <button onClick={() => this.pgState.setAppState(AppState.WORD_BASH)}>2</button>
        {toRender}
      </>
    );
  }
}