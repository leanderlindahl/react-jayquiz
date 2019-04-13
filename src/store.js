import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

let composeEnhancers = compose;
/* eslint-disable no-underscore-dangle */
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
