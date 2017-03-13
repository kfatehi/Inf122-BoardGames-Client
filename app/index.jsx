//import 'font-awesome/less/font-awesome.less';
//import 'bootstrap/less/bootstrap.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import ReduxThunk from 'redux-thunk';
import router from './router.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import './style.less';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>{router(store)}</Provider>,
  document.getElementById('root')
);
