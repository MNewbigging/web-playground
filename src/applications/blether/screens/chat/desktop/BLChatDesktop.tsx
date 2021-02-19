import { observer } from 'mobx-react';
import React from 'react';

import '../../../blether-classes.scss';
import './bl-chat-desktop.scss';

@observer
export class BLChatDesktop extends React.PureComponent {
  public render() {
    return (
      <div className={'chat-desktop'}>
        <div className={'panel'}>
          <div className={'top-bar'}>
            <div className={'name'}>Group name</div>
            <div className={'button small'}>exit</div>
          </div>
          <div className={'participants'}></div>
          <div className={'chat-id'}>
            <div className={'id-box'}>
              <div className={'label'}>Invite others to join:</div>
              <div className={'id'}>akdj20sdkj200</div>
              <div className={'button small'}>Copy to clipboard</div>
            </div>
          </div>
        </div>

        <div className={'chat'}>
          <div className={'log'}></div>
          <div className={'input-area'}>
            <input className={'input'} type={'text'} />
          </div>
        </div>
      </div>
    );
  }
}
