import React from 'react';

import { TLButton, TLButtonIntent } from '../core/TLButton';
import { DialogState } from './TLDialogsState';

import './tl-dialog.scss';

interface DialogProps {
  state: DialogState;
  title: string;
  onCancel: () => void;
  onAccept?: () => void;
  acceptText?: string;
  className?: string;
  keepOpen?: boolean;
}

export const TLDialog: React.FC<DialogProps> = ({
  children,
  state,
  title,
  onCancel,
  onAccept,
  acceptText,
  className,
  keepOpen,
}) => {
  const closeBtnText = onAccept ? 'CANCEL' : 'CLOSE';
  const acceptBtnText = acceptText ?? 'ACCEPT';
  const optClass = className ?? '';
  return (
    <>
      <div
        className={'tl-dialog-backdrop ' + [state, optClass].join(' ')}
        onClick={() => onCancel()}
      ></div>
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
              text={acceptBtnText}
              intent={TLButtonIntent.ACCEPT}
              onClick={() => {
                onAccept();
                if (!keepOpen) {
                  onCancel();
                }
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
