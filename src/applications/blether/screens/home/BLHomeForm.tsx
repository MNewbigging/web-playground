import React from 'react';

import '../../blether-classes.scss';
import './bl-home-form.scss';

interface HFProps {
  onHost: () => void;
  onJoin: () => void;
  onExit: () => void;
}

export class BLHomeForm extends React.PureComponent<HFProps> {
  public render() {
    const { onHost, onJoin, onExit } = this.props;
    return (
      <div className={'home-form'}>
        <div className={'button large'} onClick={onHost}>
          host
        </div>
        <div className={'button large'} onClick={onJoin}>
          join
        </div>
        <div className={'exit button medium minimal'} onClick={onExit}>
          exit
        </div>
      </div>
    );
  }
}
