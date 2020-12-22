import React from 'react';

import { observer } from 'mobx-react';

import { Button, Radio, RadioGroup } from '@blueprintjs/core';

import { MemoRuneState, MRPairCount } from '../MemoRuneState';

import './mr-menu.scss';

interface MenuProps {
  mrState: MemoRuneState;
  toApp: () => void;
}

@observer
export class MRMenu extends React.Component<MenuProps> {
  public render() {
    const { mrState } = this.props;
    const toRender: JSX.Element = mrState.gameState
      ? this.renderInGameMenu()
      : this.renderNormalMenu();

    return (
      <div key={'mr-menu'} className={'mr-menu'}>
        {toRender}
      </div>
    );
  }

  // for when no game is in progress
  private renderNormalMenu() {
    const { mrState } = this.props;
    return (
      <React.Fragment key={'normal-menu'}>
        <RadioGroup
          label={'Game size:'}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            mrState.setGameSize(parseInt(event.currentTarget.value, 10))
          }
          selectedValue={mrState.gameSize}
        >
          <Radio label={`XL: ${MRPairCount.XL} pairs`} value={MRPairCount.XL} />
          <Radio label={`L: ${MRPairCount.L} pairs`} value={MRPairCount.L} />
          <Radio label={`M: ${MRPairCount.M} pairs`} value={MRPairCount.M} />
          <Radio label={`S: ${MRPairCount.S} pairs`} value={MRPairCount.S} />
          <Radio label={`XS: ${MRPairCount.XS} pairs`} value={MRPairCount.XS} />
        </RadioGroup>
        <div className={'btn-container'}>
          <Button
            key={'start1p-btn'}
            className={'menu-btn'}
            minimal={true}
            text={'1 Player'}
            onClick={() => mrState.startGame(1)}
          />
        </div>
        <div className={'btn-container'}>
          <Button
            key={'start2p-btn'}
            className={'menu-btn'}
            minimal={true}
            text={'2 Player'}
            onClick={() => mrState.startGame(2)}
          />
        </div>

        {this.renderExitButton()}
      </React.Fragment>
    );
  }

  // for when a game is in progress, has different buttons
  private renderInGameMenu() {
    const { mrState } = this.props;
    return (
      <React.Fragment key={'ingame-menu'}>
        <div className={'btn-container'}>
          <Button
            key={'resume-btn'}
            className={'menu-btn'}
            minimal={true}
            text={'Resume'}
            onClick={() => mrState.resumeGame()}
          />
        </div>

        <div className={'btn-container'}>
          <Button
            key={'endgame-btn'}
            className={'menu-btn'}
            minimal={true}
            text={'End game'}
            onClick={() => mrState.endGame()}
          />
        </div>
        {this.renderExitButton()}
      </React.Fragment>
    );
  }

  private renderExitButton() {
    const { toApp } = this.props;
    return (
      <div className={'btn-container'}>
        <Button
          key={'exit-btn'}
          className={'menu-btn'}
          minimal={true}
          text={'Exit game'}
          onClick={() => toApp()}
        />
      </div>
    );
  }
}
