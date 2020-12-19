import React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@blueprintjs/core';

import { MemoRuneState } from '../MemoRuneState';

import './mr-menu.scss';

interface MenuProps {
  mrState: MemoRuneState;
}

@observer
export class MRMenu extends React.Component<MenuProps> {
  public render() {
    const { mrState } = this.props;
    return (
      <div key={'mr-menu'} className={'mr-menu'}>
        <Button key={'start-btn'} text={'Start'} onClick={() => mrState.startGame()} />
      </div>
    );
  }
}
