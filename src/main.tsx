import 'core-js/shim';

import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import Travel from 'component/Travel';
import PassengerGrid from 'component/PassengerGrid';

import { store } from 'state/configureStore';

import './main.css';

ReactDOM.render(
  <Provider store={store}>
    <div className="app">
      <header className="py3 bg-blue">
        <h1 className="white center align-middle m0">Travel</h1>
      </header>
      <div className="p3 content">
        <Travel></Travel>
        <PassengerGrid></PassengerGrid>
      </div>
    </div>
  </Provider>,
  document.getElementById('main')
);
