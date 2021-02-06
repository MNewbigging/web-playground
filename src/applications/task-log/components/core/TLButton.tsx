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
}

export const TLButton: React.FC<TLBProps> = ({ intent, text, onClick }) => {
  return (
    <div className={'tl-button ' + intent} onClick={onClick}>
      <div>{text}</div>
    </div>
  );
};
