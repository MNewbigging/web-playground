import React from 'react';

import { Card } from '@blueprintjs/core';

interface AppCardProps {
  title: string;
  toApp: () => void;
}

export class AppCard extends React.Component<AppCardProps> {
  public render() {
    const { title, toApp } = this.props;
    return (
      <Card className={'app-card'} elevation={2} onClick={() => toApp()}>
        {title}
      </Card>
    );
  }
}
