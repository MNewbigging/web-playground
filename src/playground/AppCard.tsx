import React from 'react';

import { observer } from 'mobx-react';

import { Card } from '@blueprintjs/core';

import './app-card.scss';

interface AppCardProps {
  label: string;
  toApp: () => void;
}

@observer
export class AppCard extends React.Component<AppCardProps> {
  public render() {
    const { label, toApp } = this.props;
    return (
      <Card key={'ac-' + label} className={'app-card'} elevation={2} onClick={toApp}>
        <div>{label}</div>
      </Card>
    );
  }
}