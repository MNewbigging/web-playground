import React from 'react';

import './tl-dialog.scss';

interface DialogProps {
  open: boolean;
}

export const TLDialog: React.FC<DialogProps> = ({ children, open }) => {
  const openClass = open ? 'open' : 'closed';
  return <div className={'tl-dialog ' + openClass}>{children}</div>;
};
