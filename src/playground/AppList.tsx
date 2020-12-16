import React from 'react';

import { AppCard } from './AppCard';
import { AppState, PlaygroundState } from './PlaygroundState';

import './app-list.scss';
// Import the styles for each app card from their application folder
import '../applications/desk-scene/desk-scene-card.scss';

interface AppListProps {
  pgState: PlaygroundState;
}

export class AppList extends React.Component<AppListProps> {
  public render() {
    const { pgState } = this.props;
    return (
      <div className={'app-list'}>
        <AppCard
          classname={'word-bash-card'}
          title={'Word Bash'}
          toApp={() => pgState.toApp(AppState.WORD_BASH)}
        />
        <AppCard
          classname={'desk-scene-card'}
          title={'Desk Scene'}
          toApp={() => pgState.toApp(AppState.DESK_SCENE)}
        />
      </div>
    );
  }
}
