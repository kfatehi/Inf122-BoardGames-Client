import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import { ConnectForm } from './ConnectForm.jsx';

export const Home = React.createClass({
  render() {
    const {
      server,
      username,
      connecting,
      connected,
      connectionError
    } = this.props;
    const whyShitError = () => <a href="http://stackoverflow.com/a/31003057/511621">Why is this error vague?</a>;
    return <div>
      { connectionError ? <div>Error: {connectionError} {whyShitError()}</div> : null}
      { connected ? <div>Connected {username}@{server}</div> : null}
      { !connected && !connecting ? <ConnectForm /> : null}
      home
    </div>
  },
});


function mapStateToProps(state) {
  return {
    server: state.server,
    username: state.username,
    connecting: state.connecting,
    connected: state.connected,
    connectionError: state.connectionError
  }
}

export const HomePage = connect(mapStateToProps, actionCreators)(Home); 
