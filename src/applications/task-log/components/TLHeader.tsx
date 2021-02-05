import React from 'react';

import './tl-header.scss';

interface HeaderProps {
  time: string;
}

export const TLHeader: React.FC<HeaderProps> = ({ time }) => {
  return (
    <header className={'tl-header'}>
      {time}
      <hr />
    </header>
  );
};
