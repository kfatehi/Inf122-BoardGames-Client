import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

export const Connect = React.createClass({
  getInitialState() {
    return {
      server: this.props.server,
      username: this.props.username
    };
  },
  render() {
    return <form>
      <input
        type="text"
        value={this.state.server}
        placeholder="ws://server.name/path"
        onChange={(e)=>this.setState({ server: e.target.value})}
      />
      <input
        type="text"
        value={this.state.username}
        placeholder="username"
        onChange={(e)=>this.setState({ username: e.target.value})}
      />
      <button onClick={this.connect}>Connect</button>
    </form>
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
    username: state.username
  }
}

export const ConnectForm = connect(mapStateToProps, actionCreators)(Connect); 
