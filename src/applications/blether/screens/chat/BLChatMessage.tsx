import React from 'react';

import { BLContentMessage } from '../../model/BLMessages';

import './bl-chat-message.scss';

interface CMProps {
  participantId: string;
  message: BLContentMessage;
}

export class BLChatMessage extends React.PureComponent<CMProps> {
  public render() {
    const { participantId, message } = this.props;
    const ownMsg = message.senderId === participantId ? 'own-msg' : 'other-msg';

    return (
      <div className={'chat-message ' + ownMsg}>
        <div className={'sender'}>{message.senderName}</div>
        <div className={'time'}>{message.timestamp}</div>
        <div className={'content'}>{message.content}</div>
      </div>
    );
  }
}
