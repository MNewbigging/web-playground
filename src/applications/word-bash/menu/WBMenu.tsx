import React from 'react';

import { observer } from 'mobx-react';

import { Button, Radio, RadioGroup } from '@blueprintjs/core';

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
      <div key={'main'}>
        {/* <RadioGroup>
          <Radio />
          <Radio />
          <Radio />
        </RadioGroup> */}
        <Button
          key={'start'}
          className={'button'}
          text={'START'}
          onClick={() => wbState.startGame()}
        />
      </div>
    );
  }

  private renderPauseMenu() {
    const { wbState } = this.props;
    return (
      <div key={'pause'}>
        <Button
          key={'resume'}
          className={'button'}
          text={'RESUME'}
          onClick={() => wbState.resumeGame()}
        />
        <Button
          key={'endgame'}
          className={'button'}
          text={'END GAME'}
          onClick={() => wbState.endGame()}
        />
      </div>
    );
  }

  private renderCommonButtons() {
    const x = window.innerWidth;
    const y = window.innerHeight;
    const { toApp } = this.props;
    return (
      <div key={'common'}>
        <Button key={`size ${x}, ${y}`} className={'button'} text={`size ${x}, ${y}`} />
        <Button key={'exitgame'} className={'button'} text={'EXIT GAME'} onClick={() => toApp()} />
      </div>
    );
  }
}
