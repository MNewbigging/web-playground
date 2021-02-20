import { observer } from 'mobx-react';
import React from 'react';

import { BLParticipant } from '../../../model/BLParticipant';

import '../../../blether-classes.scss';
import './bl-chat-desktop.scss';

interface ChatProps {
  participant: BLParticipant;
}

@observer
export class BLChatDesktop extends React.PureComponent<ChatProps> {
  public render() {
    const { participant } = this.props;
    return (
      <div className={'chat-desktop'}>
        <div className={'panel'}>
          <div className={'top-bar'}>
            <div className={'name'}>Group name</div>
            <div className={'button small'}>exit</div>
          </div>
          <div className={'participants'}>{this.renderParticipants()}</div>
          <div className={'chat-id'}>
            <div className={'id-box'}>
              <div className={'label'}>Invite others to join:</div>
              <div className={'id'}>{participant.hostId}</div>
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

  private renderParticipants() {
    const { participant } = this.props;
    return participant.participantNames.map((name, i) => {
      return (
        <div key={name + i} className={'item'}>
          {name}
        </div>
      );
    });
  }
}
