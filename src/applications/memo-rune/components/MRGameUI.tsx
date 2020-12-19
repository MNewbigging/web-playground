import React from 'react';

import { observer } from 'mobx-react';

import { Icon } from '@blueprintjs/core';

import './mr-game-ui.scss';

interface UIProps {
  pauseGame: () => void;
}

@observer
export class MRGameUI extends React.Component<UIProps> {
  public render() {
    const { pauseGame } = this.props;
    return (
      <div key={'mr-ui'} className={'mr-ui'}>
        <div className={'button-outer'}>
          <div className={'button'} onClick={() => pauseGame()}>
            <Icon icon={'menu'} iconSize={24} />
          </div>
        </div>
      </div>
    );
  }
}
