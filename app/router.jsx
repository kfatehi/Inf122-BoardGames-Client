import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import { App } from './components/App.jsx';
import { HomePage } from './components/HomePage.jsx';
import { NewPugPage } from './components/NewPugPage.jsx';

import { connect } from './action-creators';
import { getServer, getUsername } from './components/ConnectForm.jsx';

const autoConnect = (store) => {
  const { server, username } = store.getState();
  store.dispatch(connect(server, username));
}

export default (store) => <Router history={hashHistory}>
  <Route component={App} onEnter={autoConnect(store)}>
    <Route path="/" component={HomePage} />
    <Route path="/pugs/new" component={NewPugPage} />
  </Route>
</Router>
