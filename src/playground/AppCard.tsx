import React, { SyntheticEvent } from 'react';

import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Card, Icon, Popover } from '@blueprintjs/core';

// Styling in app-list.scss

interface AppCardProps {
  title: string;
  toApp: () => void;
  classname: string;
  popoverContent: JSX.Element;
}

@observer
export class AppCard extends React.Component<AppCardProps> {
  @observable private popoverOpen: boolean = false;

  public render() {
    const { title, toApp, classname, popoverContent } = this.props;
    return (
      <Popover
        isOpen={this.popoverOpen}
        onInteraction={(nextOpenState) => this.onInteraction(nextOpenState)}
        content={popoverContent}
      >
        <Card className={'app-card ' + classname} elevation={2} onClick={() => toApp()}>
          <div className={'app-card-title'}>{title}</div>
          <Icon className={'help-button'} icon={'help'} onClick={this.onHelpButtonClick} />
        </Card>
      </Popover>
    );
  }

  private onHelpButtonClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // Prevent clicking into the app
    e.stopPropagation();
    this.popoverOpen = !this.popoverOpen;
  };

  private onInteraction(nextOpenState: boolean, e?: SyntheticEvent<HTMLElement, Event>) {
    this.popoverOpen = nextOpenState;
  }
}
