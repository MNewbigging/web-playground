import React from 'react';

import { ITodo } from '../../model/TLTodo';

import './tl-edit-item.scss';

interface EditProps {
  todo: ITodo;
}

export class TLEditItem extends React.PureComponent<ITodo> {
  public render() {
    return <div className={'tl-edit-item'}></div>;
  }
}
