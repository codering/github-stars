import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import { syncHistory } from 'react-router-redux';
import { hashHistory } from 'react-router';
import { install } from 'redux-loop';
import DevTools from '../containers/DevTools';

export default function configure(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore;

  const enhancer = compose(
    applyMiddleware(syncHistory(hashHistory)),
    //DevTools.instrument(),
    install()
    //window.devToolsExtension ? window.devToolsExtension() : f => f,
  );
  const store = createStore(rootReducer, initialState, enhancer);

  window.store = store;

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
