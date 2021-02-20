import { Drawer } from '@blueprintjs/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { BLParticipant } from '../../../model/BLParticipant';

import './bl-chat-mobile.scss';

interface ChatProps {
  participant: BLParticipant;
}

@observer
export class BLChatMobile extends React.PureComponent<ChatProps> {
  @observable private drawerOpen = false;
  public render() {
    return (
      <div className={'chat-mobile'}>
        {this.renderDrawer()}
        <div className={'top-bar'}>
          <div className={'name'}>Group name</div>
          <div className={'drawer button small'} onClick={this.toggleDrawer}>
            ...
          </div>
        </div>
        <div className={'log'}></div>
        <div className={'input-area'}>
          <input className={'input'} type={'text'} />
        </div>
      </div>
    );
  }

  private renderDrawer() {
    const { participant } = this.props;
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
            <div className={'drawer button small'} onClick={this.toggleDrawer}>
              ...
            </div>
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
}
