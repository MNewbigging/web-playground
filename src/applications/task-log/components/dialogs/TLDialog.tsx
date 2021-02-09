import React from 'react';

import { TLButton, TLButtonIntent } from '../core/TLButton';
import { DialogState } from './TLDialogsState';

import './tl-dialog.scss';

interface DialogProps {
  state: DialogState;
  title: string;
  onCancel: () => void;
  onAccept?: () => void;
  className?: string;
}

export const TLDialog: React.FC<DialogProps> = ({
  children,
  state,
  title,
  onCancel,
  onAccept,
  className,
}) => {
  const closeBtnText = onAccept ? 'CANCEL' : 'CLOSE';
  const optClass = className ?? '';
  return (
    <>
      <div className={'tl-dialog-backdrop ' + state} onClick={() => onCancel()}></div>
      <div className={'tl-dialog ' + [state, optClass].join(' ')}>
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
