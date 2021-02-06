import React from 'react';

import './tl-dialog.scss';

interface DialogProps {
  open: boolean;
  title: string;
}

export const TLDialog: React.FC<DialogProps> = ({ children, open, title }) => {
  const openClass = open ? 'open' : 'closed';
  return (
    <div className={'tl-dialog ' + openClass}>
      <div className={'header'}>
        <div className={'title'}>{title}</div>
        <hr />
      </div>
      <div className={'children'}>{children}</div>
    </div>
  );
};
