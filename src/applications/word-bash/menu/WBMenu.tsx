import React from 'react';

import { Button } from '@blueprintjs/core';

import { WordBashState } from '../WordBashState';

import './wb-menu.scss';

interface WBMenuProps {
  wbState: WordBashState;
}

export class WBMenu extends React.Component<WBMenuProps> {
  public render() {
    const { wbState } = this.props;
    return (
      <div className={'wb-menu'}>
        <Button text={'START'} onClick={() => wbState.startGame()} />
        <Button text={'OPTIONS'} />
      </div>
    );
  }
}