import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import { HomePage } from './components/HomePage.jsx';

import { connect } from './action-creators';
import { getServer, getUsername } from './components/ConnectForm.jsx';

const autoConnect = (store) => {
  const { server, username } = store.getState();
  store.dispatch(connect(server, username));
}

export default (store) => <Router history={hashHistory}>
  <Route path="/" component={HomePage} onEnter={autoConnect(store)}/>
</Router>
