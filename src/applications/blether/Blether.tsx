import { observer } from 'mobx-react';
import React from 'react';

import { BletherState } from './BletherState';
import { BLHomeDialog } from './screens/home/BLHomeDialog';

import './blether.scss';

@observer
export class Blether extends React.PureComponent {
  private readonly bState = new BletherState();

  public render() {
    return (
      <div className={'blether-app'}>
        <div className={'overlay'}></div>
        <BLHomeDialog />
      </div>
    );
  }
}
