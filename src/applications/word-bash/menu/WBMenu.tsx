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
        <Button className={'button'} text={'START'} onClick={() => wbState.startGame()} />
        <Button className={'button'} text={'OPTIONS'} />
      </>
    );
  }

  private renderPauseMenu() {
    const { wbState } = this.props;
    return (
      <>
        <Button className={'button'} text={'RESUME'} onClick={() => wbState.resumeGame()} />
        <Button className={'button'} text={'END GAME'} onClick={() => wbState.endGame()} />
        <Button className={'button'} text={'OPTIONS'} />
      </>
    );
  }
}
