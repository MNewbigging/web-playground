import React from 'react';

import { TLCreateItemState } from './TLCreateItemState';

interface CreateItemProps {
  ciState: TLCreateItemState;
}

export class TLCreateItem extends React.PureComponent<CreateItemProps> {
  public render() {
    return <div>CREATE_ITEM</div>;
  }
}
