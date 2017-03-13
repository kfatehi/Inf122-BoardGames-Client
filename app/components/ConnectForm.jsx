import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export const Connect = React.createClass({
  getInitialState() {
    return {
      server: this.props.server,
      username: this.props.username,
      connectionError: this.props.connectionError,
      open: true
    };
  },
  handleOpen() {
      this.setState({open: true});
  },
  handleClose() {
      this.setState({open: false});
  },
  render() {
    const actions = [
      <FlatButton
        type="submit"
        label="Connect"
        primary={true}
        keyboardFocused={true}
        className="button-submit"
        onTouchTap={this.connect}
      />,
    ];
    const dialogWidth = {
      width: '50%',
    };
    return (
      <div>
        <Dialog
          title="Connect To Server"
          modal={true}
          actions={actions}
          open={this.state.open}
          contentStyle={dialogWidth}
          onRequestClose={this.handleClose}
        >
          {this.state.connectionError ? <div style={{color: 'red', fontWeight: 'bolder'}}>
            Error: {this.state.connectionError} {' '}
            <a href="http://stackoverflow.com/a/31003057/511621">Why is this error vague?</a>
          </div> : null}
          <form onSubmit={this.connect}>
          <TextField
            floatingLabelText="Server Address"
            hintText="ws://server.name/path"
            value={this.state.server}
            onChange={(e)=>this.setState({ server: e.target.value})}
            fullWidth={true}
          /><br />
          <TextField
            floatingLabelText="Username"
            hintText="unique username"
            value={this.state.username}
            onChange={(e)=>this.setState({ username: e.target.value})}
            fullWidth={true}
          /><br />
          <button type="submit" style={{display: 'none'}}/>
        </form>
        </Dialog>
    </div>
    );
  },
  connect(e) {
    e.preventDefault();
    const serverURL = this.state.server;
    const username = this.state.username;

    sessionStorage.setItem("PROXY_TARGET", serverURL);
    sessionStorage.setItem("USERNAME", username);

    this.props.connect(serverURL, username);
  }
});


function mapStateToProps(state) {
  return {
    server: state.server,
    username: state.username,
    connectionError: state.connectionError
  }
}

export const ConnectForm = connect(mapStateToProps, actionCreators)(Connect);
