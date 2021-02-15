import React from 'react';

import './tl-panel.scss';

interface PanelProps {
  className: string;
  title?: string;
  actionRail?: JSX.Element;
}

export const TLPanel: React.FC<PanelProps> = ({ children, className, title, actionRail }) => {
  return (
    <div className={'tl-panel ' + className}>
      {title && (
        <div className={'title-bar'}>
          <div className={'title'}>{title}</div>
          {actionRail && <div className={'action-rail'}>{actionRail}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
