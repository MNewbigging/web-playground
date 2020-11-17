import React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@blueprintjs/core';

import { WordBashState } from '../WordBashState';

import './wb-menu.scss';

interface WBMenuProps {
  wbState: WordBashState;
  toApp: () => void;
}

@observer
export class WBMenu extends React.Component<WBMenuProps> {
  public render() {
    const { wbState } = this.props;
    const toRender: JSX.Element[] = [];

    // State specific menu buttons
    wbState.pausedGame
      ? toRender.push(this.renderPauseMenu())
      : toRender.push(this.renderMainMenu());
    // Common menu buttons
    toRender.push(this.renderCommonButtons());

    return <div className={'wb-menu'}>{toRender}</div>;
  }

  private renderMainMenu() {
    const { wbState } = this.props;
    return (
      <>
        <Button className={'button'} text={'START'} onClick={() => wbState.startGame()} />
      </>
    );
  }

  private renderPauseMenu() {
    const { wbState } = this.props;
    return (
      <>
        <Button className={'button'} text={'RESUME'} onClick={() => wbState.resumeGame()} />
        <Button className={'button'} text={'END GAME'} onClick={() => wbState.endGame()} />
      </>
    );
  }

  private renderCommonButtons() {
    const { wbState, toApp } = this.props;
    return (
      <>
        <Button className={'button'} text={'OPTIONS'} />
        <Button className={'button'} text={'EXIT GAME'} onClick={() => toApp()} />
      </>
    );
  }
}
