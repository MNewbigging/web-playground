import React from 'react';

import { TLButton, TLButtonIntent } from '../core/TLButton';
import { DialogState } from './TLDialogsState';

import './tl-dialog.scss';

interface DialogProps {
  state: DialogState;
  title: string;
  onCancel: () => void;
  onAccept?: () => void;
}

export const TLDialog: React.FC<DialogProps> = ({ children, state, title, onCancel, onAccept }) => {
  const closeBtnText = onAccept ? 'CANCEL' : 'CLOSE';
  return (
    <>
      <div className={'tl-dialog-backdrop ' + state} onClick={() => onCancel()}></div>
      <div className={'tl-dialog ' + state}>
        <div className={'header'}>
          <div className={'title'}>{title}</div>
          <hr />
        </div>
        <div className={'children'}>{children}</div>
        <div className={'footer'}>
          <TLButton text={closeBtnText} intent={TLButtonIntent.REJECT} onClick={onCancel} />
          {onAccept && (
            <TLButton
              text={'ACCEPT'}
              intent={TLButtonIntent.ACCEPT}
              onClick={() => {
                onAccept();
                onCancel();
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
