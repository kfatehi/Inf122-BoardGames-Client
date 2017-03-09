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
      openGames,
      supportedGames,

      disconnect,
      toServer
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

      {openGames.map((g,i)=><div key={i}>
        an open game
      </div>)}


      {supportedGames.map(({
        name, image, maxPlayers
      },i)=><div key={i}>
        <span>{name}</span> <img src={image} alt={name}/>
      </div>)}

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
    myProfile: state.userProfiles[state.username],
    openGames: state.openGames,
    supportedGames: state.supportedGames,
  }
}

export const HomePage = connect(mapStateToProps, actionCreators)(Home); 
