import 'babel-polyfill';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncReduxAndRouter } from 'react-router-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import App from '../containers/App';
import TodosContainer from '../containers/TodosContainer';
import configure from '../store';

const store = configure();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} />
      <Route path="/todos" component={TodosContainer} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
