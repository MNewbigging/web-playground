import React from 'react';

import { ITodo } from '../model/TLTodo';

import './tl-item-details.scss';

interface DetailsProps {
  todo: ITodo;
}

export class TLItemDetails extends React.PureComponent<DetailsProps> {
  public render() {
    return (
      <div className={'tl-item-details'}>
        <div className={'title-bar'}>
          <div className={'title'}></div>
          <div className={'icon-bar'}>
            <div className={'complete'}></div>
            <div className={'tracked'}></div>
            <div className={'priority'}></div>
          </div>
        </div>
        <div className={'description-box'}></div>
      </div>
    );
  }
}
