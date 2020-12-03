import React from 'react';

import { OSState, WordHackState } from '../WordHackState';

import './computer-gui.scss';

interface CGUIProps {
  whState: WordHackState;
}

export class ComputerGUI extends React.Component<CGUIProps> {
  public render() {
    const { whState } = this.props;

    let screenToRender: JSX.Element;
    if (whState.osState === OSState.BOOTING) {
      screenToRender = this.renderBootScreen();
    }

    return <div className={'screen'}>{screenToRender}</div>;
  }

  private renderBootScreen() {
    const { whState } = this.props;

    return (
      <div className={'boot-screen'}>
        <div className={'loading-msg'}>LOADING</div>
      </div>
    );
  }
}
