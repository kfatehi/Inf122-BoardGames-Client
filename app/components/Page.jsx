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
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import ClearFix from 'material-ui/internal/ClearFix';
import spacing from 'material-ui/styles/spacing';

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
    return <div>
      <Favicon url="http://findicons.com/files/icons/1786/oxygen_refit/128/package_games_board.png" />
      {!connected && !connecting ? <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <ConnectForm />
        </MuiThemeProvider> : null}

      { connected ? <div>
          <MuiThemeProvider>
            <AppBar
              title="Bored Games - INF122 Final Project "
              iconElementRight={<FlatButton label="Disconnect" onTouchTap={disconnect}/>}
            />
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <ClearFix style={{padding: spacing.desktopGutter, boxSizing: 'border-box'}}>
              <div id='content' style={{maxWidth: 1200, margin: '0 auto',}}>
                { myProfile ?
                    <PlayerProfile username={username} games={myProfile.games}/>
                    : null
                }
                {this.props.children}
              </div>
            </ClearFix>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Paper style={{bottom: 0, position: 'absolute'}}>
              Connected {username}@{server}
            </Paper>
          </MuiThemeProvider>
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
