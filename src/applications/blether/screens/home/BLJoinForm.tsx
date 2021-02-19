import React from 'react';

import '../../blether-classes.scss';

interface JoinFormProps {
  toHome: () => void;
}

export class BLJoinForm extends React.PureComponent<JoinFormProps> {
  public render() {
    const { toHome } = this.props;
    return (
      <div className={'join-form'}>
        <div className={'button'} onClick={toHome}>
          back
        </div>
      </div>
    );
  }
}
