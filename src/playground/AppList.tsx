import React from 'react';

import { AppCard } from './AppCard';
import { AppState, PlaygroundState } from './PlaygroundState';

import './app-list.scss';

interface AppListProps {
  pgState: PlaygroundState;
}

export class AppList extends React.Component<AppListProps> {
  public render() {
    const { pgState } = this.props;
    return (
      <div className={'app-list'}>
        <AppCard title={'Word Bash'} toApp={() => pgState.toApp(AppState.WORD_BASH)} />
      </div>
    );
  }
}
