import React from 'react';

import './tl-header.scss';

interface HeaderProps {
  time: string;
}

export const TLHeader: React.FC<HeaderProps> = ({ time }) => {
  return (
    <div className={'tl-header'}>
      <div className={'tl-header__time'}>{time}</div>
      <div className={'tl-header__hr'}>
        <hr />
      </div>
    </div>
  );
};
