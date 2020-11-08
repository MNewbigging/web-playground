import React from "react";
import ReactDOM from "react-dom";

import { Playground } from './playground/Playground';

import './app.scss';

/**
 * App.ts is the main entry point for the application.
 */
class App {
  // Perform app setup here
  constructor(parent: HTMLElement) {
    const app = React.createElement(Playground);

    ReactDOM.render(app, parent);
  }
}

// Where it all begins...
const rootElement = document.getElementById("app-root");
if (rootElement) {
  const app = new App(rootElement);
}
