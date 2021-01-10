import React from 'react';

interface CFProps {
  toApp: () => void;
}

export class ConnectFour extends React.Component<CFProps> {
  public render() {
    return <div>I AM CONNECT FOUR!</div>;
  }
}
