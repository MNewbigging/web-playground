import React from 'react';

import { observer } from 'mobx-react';

import { MemoRuneState, MRScreen } from './MemoRuneState';
import { Rune } from './components/Rune';
import { MRGameUI } from './components/MRGameUI';
import { MRMenu } from './components/MRMenu';

import './memo-rune.scss';

interface MRProps {
  toApp: () => void;
}

@observer
export class MemoRune extends React.Component<MRProps> {
  private mrState = new MemoRuneState();
  public render() {
    const { toApp } = this.props;
    const toRender: JSX.Element[] = [];

    switch (this.mrState.mrScreen) {
      case MRScreen.MENU:
        toRender.push(<MRMenu key={'mrmenu'} mrState={this.mrState} toApp={toApp} />);
        break;
      case MRScreen.GAME:
        toRender.push(this.renderGame());
        break;
    }

    return (
      <div key={'memo-rune'} className={'memo-rune'}>
        {toRender}
      </div>
    );
  }

  private renderGame() {
    const { gameState } = this.mrState;

    const runes: JSX.Element[] = [];

    gameState.runes.forEach((r) => {
      runes.push(<Rune key={'rune-' + r.id} rune={r} selectRune={gameState.selectRune} />);
    });

    return (
      <React.Fragment key={'container'}>
        <div key={'left-panel'} className={'left-panel'}>
          {this.renderPlayerPanel()}
        </div>
        <div>
          <div key={'rune-area'} className={'rune-area'}>
            {runes}
          </div>
        </div>
      </React.Fragment>
    );
  }

  // Player panel is the panel to left of rune area
  private renderPlayerPanel() {
    const { gameState } = this.mrState;
    const dangerRunes: JSX.Element[] = [];

    // for (let i = 0; i < 4; i++) {
    //   const r = gameState.runes[i];
    //   dangerRunes.push(
    //     <Rune key={'dr' + r.posX + r.posY} rune={r} selectRune={gameState.selectRune} />
    //   );
    // }

    const pairRunes: JSX.Element[] = [];
    // for (let i = 0; i < 15; i++) {
    //   const r = gameState.runes[i];
    //   pairRunes.push(<Rune key={'pr' + r.posX + r.posY} rune={r} />);
    // }

    return (
      <React.Fragment key={'player-panel'}>
        <div className={'ui-bar'}>
          <MRGameUI pauseGame={() => this.mrState.pauseGame()} />
        </div>
        <div>
          <div className={'danger-runes'}>{dangerRunes}</div>
        </div>
        <div>
          <div className={'rune-pairs'}>{pairRunes}</div>
        </div>
      </React.Fragment>
    );
  }
}
