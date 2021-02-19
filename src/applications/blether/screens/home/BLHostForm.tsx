import React from 'react';

import '../../blether-classes.scss';
import './bl-host-form.scss';

interface HostFormProps {
  toHome: () => void;
}

export class BLHostForm extends React.PureComponent<HostFormProps> {
  public render() {
    const { toHome } = this.props;
    return (
      <div className={'host-form'}>
        <div className={'form'}>
          <div className={'label'}>What's your name?</div>
          <input type={'text'} className={'input'} />
          <div className={'button medium'}>Start a blether</div>
        </div>
        <div className={'back'}>
          <div onClick={toHome} className={'button small minimal'}>
            back
          </div>
        </div>
      </div>
    );
  }
}
