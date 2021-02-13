import React from 'react';

import './tl-header.scss';

interface HeaderProps {
  date: string;
  time: string;
}

export const TLHeader: React.FC<HeaderProps> = ({ date, time }) => {
  return (
    <div className={'tl-header'}>
      <div className={'tl-header__date-time'}>
        <div className={'date'}>{date}</div>
        <div>{time}</div>
      </div>
      <div className={'tl-header__hr'}>
        <hr />
      </div>
    </div>
  );
};
