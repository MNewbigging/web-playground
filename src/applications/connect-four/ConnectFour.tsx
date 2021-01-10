import React from 'react';

import { observer } from 'mobx-react';

import { Button, Card } from '@blueprintjs/core';

import { ConnectFourState } from './ConnectFourState';

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

    return <div className={'connect-four'}>{toRender}</div>;
  }

  private renderMenuButtons() {
    const { toApp } = this.props;
    return (
      <Card key={'c4-menu-card'} elevation={2} className={'c4-menu'}>
        <Button text={'Exit'} onClick={() => toApp()} />
      </Card>
    );
  }
}
