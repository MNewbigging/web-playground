import React from 'react';

import { observer } from 'mobx-react';

import { AppCard } from './AppCard';
import { AppState, PlaygroundState } from './PlaygroundState';

interface AppListProps {
  pgState: PlaygroundState;
}

@observer
export class AppList extends React.Component<AppListProps> {
  public render() {
    const { pgState } = this.props;
    return (
      <div className={'app-list-container'}>
        <AppCard label={'Word Bash'} toApp={() => pgState.toApp(AppState.WORD_BASH)} />
      </div>
    );
  }
}