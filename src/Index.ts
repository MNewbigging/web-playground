import React from "react";
import ReactDOM from "react-dom";

import { Playground } from './playground/Playground';
import { PlaygroundState } from './playground/PlaygroundState';

class App {
  constructor(parentElement: HTMLElement) {
    const state = new PlaygroundState();
    const app = React.createElement(Playground, { pgState: state });
    ReactDOM.render(app, parentElement);
  }
}

const rootElement = document.getElementById('app');
if (rootElement) {
  const app = new App(rootElement);
}
