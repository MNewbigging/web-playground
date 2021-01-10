import React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Button, Drawer, Radio, RadioGroup } from '@blueprintjs/core';

import { PoolSize } from '../fixed';
import { WordBashState } from '../WordBashState';

import './wb-menu.scss';

interface WBMenuProps {
  wbState: WordBashState;
  toApp: () => void;
}

@observer
export class WBMenu extends React.Component<WBMenuProps> {
  @observable private drawerOpen: boolean = false;

  public render() {
    const { wbState } = this.props;
    const toRender: JSX.Element[] = [];

    // State specific menu buttons
    wbState.pausedGame
      ? toRender.push(this.renderPauseMenu())
      : toRender.push(this.renderMainMenu());
    // Common menu buttons
    toRender.push(this.renderCommonButtons());

    // How to play drawer
    toRender.push(this.renderDrawer());

    return <div className={'wb-menu'}>{toRender}</div>;
  }

  private renderMainMenu() {
    const { wbState } = this.props;
    return (
      <div key={'main'}>
        <RadioGroup
          label={'Game size:'}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            wbState.setGameSize(parseInt(event.currentTarget.value, 10))
          }
          selectedValue={wbState.gameSize}
        >
          <Radio label={`Small: ${PoolSize.SMALL} tiles`} value={PoolSize.SMALL} />
          <Radio label={`Medium: ${PoolSize.MEDIUM} tiles`} value={PoolSize.MEDIUM} />
          <Radio label={`Large: ${PoolSize.LARGE} tiles`} value={PoolSize.LARGE} />
        </RadioGroup>
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
    const { toApp } = this.props;
    return (
      <div key={'common'}>
        <Button
          key={'how-to'}
          className={'button'}
          text={'HOW TO PLAY'}
          onClick={() => (this.drawerOpen = !this.drawerOpen)}
        />
        <Button key={'exitgame'} className={'button'} text={'EXIT GAME'} onClick={() => toApp()} />
      </div>
    );
  }

  private renderDrawer() {
    return (
      <Drawer
        key={'drawer'}
        isOpen={this.drawerOpen}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        onClose={() => (this.drawerOpen = !this.drawerOpen)}
      >
        {this.drawerContent()}
      </Drawer>
    );
  }

  private drawerContent() {
    return (
      <div className={'drawer-content'}>
        <h2>How to play Word Bash</h2>
        <p>
          In Word Bash, you are given a pool of random letters, called tiles, which you use to make
          words.
        </p>
        <p>Choose your game size to determine how many letter tiles you want to play with.</p>
        <p>To win, you must use all the letter tiles in the pool in as many words as you like.</p>
        <p>You cannot use the same word twice; each word accepted must be unique.</p>
        <p>
          Click on a word you have already accepted to remove it and return those letters to the
          pool.
        </p>
        <p>
          You are awarded points based on the length of your accepted words - try to get as many
          long words as you can!
        </p>
      </div>
    );
  }
}
