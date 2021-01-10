import React from 'react';

import { observer } from 'mobx-react';

import { Button, Card } from '@blueprintjs/core';

import { C4CharSelect } from './C4CharSelect';
import { C4GameState, ConnectFourState } from './ConnectFourState';

import './connect-four.scss';

interface CFProps {
  toApp: () => void;
}

@observer
export class ConnectFour extends React.Component<CFProps> {
  private cfState = new ConnectFourState();

  public render() {
    const toRender: JSX.Element[] = [];
    toRender.push(this.renderMenuButtons());

    if (this.cfState.gameState === C4GameState.CHAR_SELECT) {
      toRender.push(
        <div key={'game-area'} className={'c4-game'}>
          {this.renderCharacterSelect()}
        </div>
      );
    }

    return <div className={'connect-four'}>{toRender}</div>;
  }

  private renderMenuButtons() {
    const { toApp } = this.props;
    return (
      <Card key={'c4-menu-card'} elevation={2} className={'c4-menu'}>
        <Button key={'exit-btn'} text={'Exit'} onClick={() => toApp()} />
      </Card>
    );
  }

  private renderCharacterSelect() {
    return <C4CharSelect />;
  }
}
