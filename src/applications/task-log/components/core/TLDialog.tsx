import React from 'react';

import { TLButton, TLButtonIntent } from './TLButton';

import './tl-dialog.scss';

export enum DialogState {
  OPEN = 'open',
  CLOSING = 'closing',
  CLOSED = 'closed',
}

interface DialogProps {
  state: DialogState;
  title: string;
  onCancel: () => void;
  onAccept: () => void;
}

export const TLDialog: React.FC<DialogProps> = ({ children, state, title, onCancel, onAccept }) => {
  return (
    <div className={'tl-dialog ' + state}>
      <div className={'header'}>
        <div className={'title'}>{title}</div>
        <hr />
      </div>
      <div className={'children'}>{children}</div>
      <div className={'footer'}>
        <TLButton text={'CANCEL'} intent={TLButtonIntent.REJECT} onClick={onCancel} />
        <TLButton
          text={'ACCEPT'}
          intent={TLButtonIntent.ACCEPT}
          onClick={() => {
            onAccept();
            onCancel();
          }}
        />
      </div>
    </div>
  );
};
