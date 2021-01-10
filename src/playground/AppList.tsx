import React from 'react';

import { AppCard } from './AppCard';
import { AppState, PlaygroundState } from './PlaygroundState';

// Popover content for each app card
import { DSInfoPopover } from '../applications/desk-scene/DSInfoPopover';
import { MRInfoPopover } from '../applications/memo-rune/MRInfoPopover';
import { WBInfoPopover } from '../applications/word-bash/WBInfoPopover';

// Import the styles for each app card from their application folder
import '../applications/desk-scene/desk-scene-card.scss';
import '../applications/memo-rune/memo-rune-card.scss';
import '../applications/word-bash/word-bash-card.scss';
import './app-list.scss';

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
          title={'WORD BASH'}
          toApp={() => pgState.toApp(AppState.WORD_BASH)}
          popoverContent={<WBInfoPopover />}
        />
        <AppCard
          classname={'desk-scene-card'}
          title={'DESK SCENE'}
          toApp={() => pgState.toApp(AppState.DESK_SCENE)}
          popoverContent={<DSInfoPopover />}
        />
        <AppCard
          classname={'memo-rune-card'}
          title={'MEMO RUNE'}
          toApp={() => pgState.toApp(AppState.MEMO_RUNE)}
          popoverContent={<MRInfoPopover />}
        />
        <AppCard
          classname={'connect-four-card'}
          title={'Connect Four'}
          toApp={() => pgState.toApp(AppState.CONNECT_FOUR)}
          popoverContent={<div>TODO</div>}
        />
      </div>
    );
  }
}
