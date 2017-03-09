import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import { ConnectForm } from './ConnectForm.jsx';
import { PlayerProfile } from './PlayerProfile.jsx';

export const Home = React.createClass({
  render() {
    const {
      server,
      username,
      connecting,
      connected,
      connectionError,
      userProfiles,
      myProfile,

      disconnect
    } = this.props;

    const whyShitError = () => <a href="http://stackoverflow.com/a/31003057/511621">Why is this error vague?</a>;
    const disconnectLink = () => <a href="#" onClick={disconnect}>Disconnect</a>
    return <div>
      { connectionError ? <div>Error: {connectionError} {whyShitError()}</div> : null}
      { connected ? <div>Connected {username}@{server} {disconnectLink()}</div> : null}
      { !connected && !connecting ? <ConnectForm /> : null}

      { myProfile ? 
          <PlayerProfile username={username} games={myProfile.games}/>
          : null
      }
    </div>
  },
});


function mapStateToProps(state) {
  return {
    server: state.server,
    username: state.username,
    connecting: state.connecting,
    connected: state.connected,
    connectionError: state.connectionError,
    userProfiles: state.userProfiles,
    myProfile: state.userProfiles[state.username]
  }
}

export const HomePage = connect(mapStateToProps, actionCreators)(Home); 
