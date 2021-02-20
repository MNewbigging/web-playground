import { Drawer } from '@blueprintjs/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

import { BLContentMessage, BLMessageType, BLNoteMessage } from '../../../model/BLMessages';
import { BLParticipant } from '../../../model/BLParticipant';
import { BLChatMessage } from '../BLChatMessage';
import { BLChatNotification } from '../BLChatNotification';
import { BLChatState } from '../BLChatState';

import './bl-chat-mobile.scss';

interface ChatProps {
  participant: BLParticipant;
  chatState: BLChatState;
  onExit: () => void;
}

@observer
export class BLChatMobile extends React.PureComponent<ChatProps> {
  @observable private drawerOpen = false;
  public render() {
    const { chatState } = this.props;
    return (
      <div className={'chat-mobile'}>
        {this.renderDrawer()}
        <div className={'top-bar'}>
          <div className={'name'}>Group name</div>
          <div className={'drawer button small'} onClick={this.toggleDrawer}>
            ...
          </div>
        </div>
        <div className={'log'}>{this.renderChatLog()}</div>
        <div className={'input-area'}>
          <input
            className={'input'}
            type={'text'}
            value={chatState.inputText}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              chatState.setInputText(event.target.value)
            }
            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                chatState.sendMessage();
              }
            }}
          />
          <div className={'send button small'} onClick={() => chatState.sendMessage()}>
            send
          </div>
        </div>
      </div>
    );
  }

  private renderDrawer() {
    const { participant, onExit } = this.props;
    return (
      <Drawer
        size={'80%'}
        isOpen={this.drawerOpen}
        canEscapeKeyClose
        canOutsideClickClose
        onClose={this.toggleDrawer}
      >
        <div className={'drawer-body'}>
          <div className={'top-bar'}>
            <div className={'name'}>Group name</div>
            <div className={'exit button small'} onClick={onExit}>
              exit
            </div>
            <div className={'drawer button small'} onClick={this.toggleDrawer}>
              ...
            </div>
          </div>
          <div className={'participants'}>{this.renderParticipants()}</div>
          <div className={'chat-id'}>
            <div className={'id-box'}>
              <div className={'label'}>Invite others to join:</div>
              <div className={'id'}>{participant.hostId}</div>
              <div className={'button small'} onClick={() => this.copyChatId()}>
                Copy to clipboard
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    );
  }

  private readonly toggleDrawer = () => {
    this.drawerOpen = !this.drawerOpen;
  };

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
    // need to reverse order for flex column-reverse
    return participant.chatLog
      .slice()
      .reverse()
      .map((msg, i) => {
        if (msg.type === BLMessageType.CONTENT) {
          const message = msg as BLContentMessage;
          return (
            <BLChatMessage key={'msg-' + i} participantId={participant.id} message={message} />
          );
        } else {
          const note = msg as BLNoteMessage;
          return <BLChatNotification key={'msg-' + i} note={note} />;
        }
      });
  }

  private copyChatId() {
    const tempInput = document.createElement('input');
    tempInput.value = this.props.participant.hostId;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.removeChild(tempInput);
  }
}
