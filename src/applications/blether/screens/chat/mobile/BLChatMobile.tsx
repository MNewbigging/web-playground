import { Drawer } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import React from 'react';

import './bl-chat-mobile.scss';

@observer
export class BLChatMobile extends React.PureComponent {
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
    return (
      <Drawer
        size={Drawer.SIZE_LARGE}
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
          <div className={'participants'}></div>
          <div className={'chat-id'}>
            <div className={'id-box'}>
              <div className={'label'}>Invite others to join:</div>
              <div className={'id'}>akdj20sdkj200</div>
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
}
