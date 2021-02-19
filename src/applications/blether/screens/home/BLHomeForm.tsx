import React from 'react';

import '../../blether-classes.scss';
import './bl-home-form.scss';

export class BLHomeForm extends React.PureComponent {
  public render() {
    return (
      <div className={'home-form'}>
        <div className={'button large'}>host</div>
        <div className={'button large'}>join</div>
      </div>
    );
  }
}
