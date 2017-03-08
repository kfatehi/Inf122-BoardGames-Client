//import 'font-awesome/less/font-awesome.less';
//import 'bootstrap/less/bootstrap.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import ReduxThunk from 'redux-thunk';
import { ServerSelectionPage } from './components/ServerSelectionPage.jsx';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={ServerSelectionPage} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
