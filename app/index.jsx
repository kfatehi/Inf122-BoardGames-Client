//import 'font-awesome/less/font-awesome.less';
//import 'bootstrap/less/bootstrap.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import ReduxThunk from 'redux-thunk';
import { getServer, ConnectPage } from './components/ConnectPage.jsx';
import { HomePage } from './components/HomePage.jsx';
import { connect } from './action-creators';

import './style.less';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

const autoconnect = ()=> store.dispatch(connect(getServer()));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={HomePage} onEnter={autoconnect} />
      <Route path="/connect" component={ConnectPage} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
