import React from 'react';

import './tl-button.scss';

export enum TLButtonIntent {
  ACCEPT = 'blue',
  REJECT = 'red',
  NEUTRAL = 'white',
}

interface TLBProps {
  intent: TLButtonIntent;
  text: string;
  onClick: () => void;
  className?: string;
}

export const TLButton: React.FC<TLBProps> = ({ intent, text, onClick, className }) => {
  const classes = ['tl-button', intent, className ?? ''];
  return (
    <div className={classes.join(' ')} onClick={onClick}>
      <div>{text}</div>
    </div>
  );
};
