import React from 'react';

import { observer } from 'mobx-react';

import { WordBash } from '../applications/word-bash/WordBash';
import { AppList } from './AppList';
import { AppState, PlaygroundState } from './PlaygroundState';

import './playground.scss';

interface PlaygroundProps {
  pgState: PlaygroundState;
}


@observer export class Playground extends React.Component<PlaygroundProps> {
  public render() {
    console.log('playground render');
    const appState = this.props.pgState.appState;
    const toRender: JSX.Element[] = [];

   switch (appState) {
      case AppState.PLAYGROUND:
        toRender.push(<AppList pgState={this.props.pgState} />);
        break;
      case AppState.WORD_BASH:
        toRender.push(<WordBash />);
        break;
      default:
        toRender.push(<div>BAD DATA</div>);
        break;
    }

    return toRender;
  }
}