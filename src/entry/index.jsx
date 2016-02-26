import '../../index.html';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncReduxAndRouter } from 'react-router-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import pick from 'lodash.pick';

import App from '../containers/App';
import configure from '../store/index';

const data = localStorage.getItem('github');
const initialState = data ? JSON.parse(data) : {};
const store = configure(initialState);
store.subscribe(() => {
  localStorage.setItem('github', JSON.stringify(pick(store.getState(), ['stars', 'user'])));
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
