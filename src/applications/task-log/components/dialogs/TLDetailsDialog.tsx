import { observer } from 'mobx-react';

import React from 'react';

import { TaskLogState } from '../../TaskLogState';
import { TLDialog } from './TLDialog';
import { TLCreateItem } from './TLCreateItem';
import { TLCreateItemState } from './TLCreateItemState';

interface TLDDProps {
  tlState: TaskLogState;
}

export class TLDetailsDialog extends React.PureComponent<TLDDProps> {
  public render() {
    const { tlState } = this.props;
    return (

    );
  }
}