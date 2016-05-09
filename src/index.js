import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// Router - object that desides what react components we need to render whenever url changes.
// browserHistory - object that tells react router how to interpret changes in the url.
// whenever the url updates, react router is going to interpret everything after the protocol.
import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(
	promise
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
