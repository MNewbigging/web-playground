import { observer } from 'mobx-react';
import React from 'react';

import { BLParticipant } from '../../../model/BLParticipant';
import { BLChatState } from '../BLChatState';

import '../../../blether-classes.scss';
import './bl-chat-desktop.scss';
import { BLChatMessage } from '../BLChatMessage';

interface ChatProps {
  participant: BLParticipant;
}

@observer
export class BLChatDesktop extends React.PureComponent<ChatProps> {
  private readonly chatState = new BLChatState(this.props.participant);
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
          <div id={'log'} className={'log'}>
            {this.renderChatLog()}
          </div>
          <div className={'input-area'}>
            <input
              className={'input'}
              type={'text'}
              value={this.chatState.inputText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.chatState.setInputText(event.target.value)
              }
              onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                  this.chatState.sendMessage();
                }
              }}
            />
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

  private renderChatLog() {
    const { participant } = this.props;
    // need to reverse array for column-reverse order
    return participant.chatLog
      .slice()
      .reverse()
      .map((msg, i) => {
        return <BLChatMessage key={'msg-' + i} participantId={participant.id} message={msg} />;
      });
  }
}
