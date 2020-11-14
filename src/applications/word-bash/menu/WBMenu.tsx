import React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@blueprintjs/core';

import { WordBashState } from '../WordBashState';

import './wb-menu.scss';

interface WBMenuProps {
  wbState: WordBashState;
}

@observer
export class WBMenu extends React.Component<WBMenuProps> {
  public render() {
    const { wbState } = this.props;
    const toRender: JSX.Element = wbState.pausedGame
      ? this.renderPauseMenu()
      : this.renderMainMenu();
    return <div className={'wb-menu'}>{toRender}</div>;
  }

  private renderMainMenu() {
    const { wbState } = this.props;
    return (
      <>
        <Button text={'START'} onClick={() => wbState.startGame()} />
        <Button text={'OPTIONS'} />
      </>
    );
  }

  private renderPauseMenu() {
    const { wbState } = this.props;
    return (
      <>
        <Button text={'RESUME'} onClick={() => wbState.resumeGame()} />
        <Button text={'END GAME'} onClick={() => wbState.endGame()} />
        <Button text={'OPTIONS'} />
      </>
    );
  }
}
