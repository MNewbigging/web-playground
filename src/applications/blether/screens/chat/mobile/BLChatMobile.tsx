import React from 'react';

import './bl-chat-mobile.scss';

export class BLChatMobile extends React.PureComponent {
  public render() {
    return (
      <div className={'chat-mobile'}>
        <div className={'top-bar'}>
          <div className={'name'}>Group name</div>
          <div className={'drawer button small'}>...</div>
        </div>
        <div className={'log'}></div>
        <div className={'input-area'}>
          <input className={'input'} type={'text'} />
        </div>
      </div>
    );
  }
}
