//import 'font-awesome/less/font-awesome.less';
//import 'bootstrap/less/bootstrap.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import ReduxThunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

const App = React.createClass({
  render: function () {
    return <div>
      Hello world!
    </div>;
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
