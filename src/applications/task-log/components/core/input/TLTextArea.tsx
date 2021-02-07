import React from 'react';

import './tl-text-area.scss';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  id?: string;
}

export class TLTextArea extends React.PureComponent<TextAreaProps> {
  public render() {
    const { onChange, placeholder, value, id } = this.props;
    return (
      <textarea
        id={id}
        className={'tl-text-area'}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      />
    );
  }
}
