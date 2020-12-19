import React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@blueprintjs/core';

import { MemoRuneState } from '../MemoRuneState';

import './mr-menu.scss';

interface MenuProps {
  mrState: MemoRuneState;
}

@observer
export class MRMenu extends React.Component<MenuProps> {
  public render() {
    return (
      <div key={'mr-menu'} className={'mr-menu'}>
        {this.renderNormalMenu()}
      </div>
    );
  }

  // for when no game is in progress
  private renderNormalMenu() {
    const { mrState } = this.props;
    return (
      <React.Fragment key={'normal-menu'}>
        <Button key={'start-btn'} text={'Start'} onClick={() => mrState.startGame()} />
      </React.Fragment>
    );
  }

  // for when a game is in progress, has different buttons
  private renderInGameMenu() {}
}
