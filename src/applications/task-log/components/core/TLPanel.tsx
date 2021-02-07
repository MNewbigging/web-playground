import React from 'react';

import './tl-panel.scss';

interface PanelProps {
  className: string;
  title?: string;
}

export const TLPanel: React.FC<PanelProps> = ({ children, className, title }) => {
  return (
    <div className={'tl-panel ' + className}>
      {title && <div className={'panel-title'}>{title}</div>}
      {children}
    </div>
  );
};
