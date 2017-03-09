import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

export const getServer = () => (
  localStorage.getItem("PROXY_TARGET") || "ws://localhost:4567/games"
);

export const getUsername = () => (
  localStorage.getItem("USERNAME") || ''
);

export const Connect = React.createClass({
  getInitialState() {
    return { server: getServer(), username: getUsername() };
  },
  render() {
    return (
      <div>
        <form style={{padding:'0 20px'}}>
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
      </div>
    );
  },
  connect(e) {
    e.preventDefault();
    const serverURL = this.state.value;
    const username = this.state.username;

    localStorage.setItem("PROXY_TARGET", serverURL);
    localStorage.setItem("USERNAME", username);

    this.props.connect(serverURL, username);
  }
});


function mapStateToProps(state) {
  return {
  }
}

export const ConnectPage = connect(mapStateToProps, actionCreators)(Connect); 
