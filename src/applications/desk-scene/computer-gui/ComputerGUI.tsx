import React from 'react';

import { observer } from 'mobx-react';

import { OSState, DeskSceneState } from '../DeskSceneState';

import './computer-gui.scss';

interface CGUIProps {
  whState: DeskSceneState;
}

@observer
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
    const progressDone = whState.osBootProgress >= 100 ? ' done' : '';
    const progressStyle = {
      width: whState.osBootProgress + '%',
    };

    return (
      <div className={'boot-screen' + progressDone}>
        <div className={'loading-msg'}>LOADING</div>
        <div className={'loading-bar'}>
          <div className={'progress'} style={progressStyle}></div>
        </div>
      </div>
    );
  }
}
