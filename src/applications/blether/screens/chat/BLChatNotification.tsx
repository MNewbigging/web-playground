import { notEqual } from 'assert';
import React from 'react';

import { BLNoteMessage } from '../../model/BLMessages';

import './bl-chat-notification.scss';

interface NoteProps {
  note: BLNoteMessage;
}

export class BLChatNotification extends React.PureComponent<NoteProps> {
  public render() {
    const { note } = this.props;
    return <div className={'chat-note'}>{note.content}</div>;
  }
}
