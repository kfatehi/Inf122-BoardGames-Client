import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import { ConnectForm } from './ConnectForm.jsx';
import { PlayerProfile } from './PlayerProfile.jsx';
import { MenuBar } from './MenuBar.jsx';
import { Link } from 'react-router';
import Favicon from 'react-favicon';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import Paper from 'material-ui/Paper';
import ClearFix from 'material-ui/internal/ClearFix';
import spacing from 'material-ui/styles/spacing';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const ActionButtonStyle = {
    margin: 0,
    top: 'auto',
    right: 40,
    bottom: 40,
    left: 'auto',
    position: 'fixed',
};

const PageComponent = React.createClass({
  render: function () {
    const {
      server,
      username,
      connecting,
      connected,
      connectionError,
      profileOpenUser,
      menuBarOpen,
      openGames,
      supportedGames,
      disconnect,
      toServer,
      openProfile,
      closeProfile,
      toggleMenuBar,
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
              iconElementRight={<IconButton
                  onTouchTap={()=>openProfile(username)}
                  tooltip="Your Player Profile"
                  tooltipPosition="bottom-left"
                ><ActionAccountBox />
                </IconButton>}
              onLeftIconButtonTouchTap={toggleMenuBar}
            />
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <MenuBar
            open={menuBarOpen}
            toggle={toggleMenuBar}
            disconnect={disconnect}
            games={openGames}
          />
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <ClearFix style={{padding: spacing.desktopGutter, boxSizing: 'border-box'}}>
              <div id='content' style={{maxWidth: 1200, margin: '0 auto',}}>
                  <PlayerProfile
                    closeAction={closeProfile}
                    open={!!profileOpenUser}
                    profile={profileOpenUser}
                  />
                {this.props.children}
                  <IconButton tooltip="Start New Game" tooltipPosition="top-left" href="#/pugs/new/" style={ActionButtonStyle}>
                    <FloatingActionButton>
                      <ContentAdd />
                    </FloatingActionButton>
                  </IconButton>
              </div>
            </ClearFix>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Paper style={{bottom: 0, position: 'fixed'}}>
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
    profileOpenUser: state.profileOpenUser,
    menuBarOpen: state.menuBarOpen
  }
}

export const Page = connect(mapStateToProps, actionCreators)(PageComponent)
