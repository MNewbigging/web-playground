import React from 'react';

import './tl-panel.scss';

interface PanelProps {
  className: string;
}

export const TLPanel: React.FC<PanelProps> = ({ children, className }) => {
  return <div className={'tl-panel ' + className}>{children}</div>;
};
