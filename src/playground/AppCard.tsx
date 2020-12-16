import React from 'react';

import { Card } from '@blueprintjs/core';

interface AppCardProps {
  title: string;
  toApp: () => void;
  classname: string;
}

export class AppCard extends React.Component<AppCardProps> {
  public render() {
    const { title, toApp, classname } = this.props;
    return (
      <Card className={'app-card ' + classname} elevation={2} onClick={() => toApp()}>
        {title}
      </Card>
    );
  }
}
