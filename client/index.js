// entry point of app -> ReactDOM Render
// in package.json => main: "index.js"
// entry point of app -> ReactDOM Render
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Switch, Route, Link } from "react-router-dom";
import history from './history';
import store from './store';
import App from './App';


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

