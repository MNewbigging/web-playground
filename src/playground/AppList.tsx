import React from 'react';

import { AppCard } from './AppCard';
import { AppState, PlaygroundState } from './PlaygroundState';

// Popover content for each app card
import { WBInfoPopover } from '../applications/word-bash/WBInfoPopover';
import { MRInfoPopover } from '../applications/memo-rune/MRInfoPopover';
import { DSInfoPopover } from '../applications/desk-scene/DSInfoPopover';

import './app-list.scss';
// Import the styles for each app card from their application folder
import '../applications/desk-scene/desk-scene-card.scss';
import '../applications/word-bash/word-bash-card.scss';
import '../applications/memo-rune/memo-rune-card.scss';

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
      </div>
    );
  }
}
