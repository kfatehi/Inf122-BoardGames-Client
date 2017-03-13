import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import { ConnectForm } from './ConnectForm.jsx';
import { PlayerProfile } from './PlayerProfile.jsx';
import { Link } from 'react-router';
import Favicon from 'react-favicon';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

const PageComponent = React.createClass({
  render: function () {
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
    const disconnectLink = () => <a href="#" onClick={disconnect}>Disconnect</a>
    return <div>
      <Favicon url="http://findicons.com/files/icons/1786/oxygen_refit/128/package_games_board.png" />
      { !connected && !connecting ? <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <ConnectForm />
        </MuiThemeProvider> : null}

      { connected ? <div>
          <MuiThemeProvider>
            <AppBar
              title="Bored Games - INF122 Final Project "
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
          </MuiThemeProvider>

          <div id='content'>
            Connected {username}@{server} {disconnectLink()}
            { myProfile ?
                <PlayerProfile username={username} games={myProfile.games}/>
                : null
            }
            {this.props.children}
          </div>
        </div> : null}
    </div>
  }
})

function mapStateToProps(state) {
  return {
    server: state.server,
    username: state.username,
    connecting: state.connecting,
    connected: state.connected,
    connectionError: state.connectionError,
    userProfiles: state.userProfiles,
    myProfile: state.userProfiles[state.username],
  }
}

export const Page = connect(mapStateToProps, actionCreators)(PageComponent)
