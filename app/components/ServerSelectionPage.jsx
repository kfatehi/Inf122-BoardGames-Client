import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

export const ServerSelection = React.createClass({
  getInitialState() {
    return { value: localStorage.getItem("PROXY_TARGET") || "ws://localhost:4567/games" };
  },
  handleChange(e) {
    this.setState({ value: e.target.value });
  },
  render() {
    return (
      <div>
        <form style={{padding:'0 20px'}}>
          <input
            type="text"
            value={this.state.value}
            placeholder="https://server.name"
            onChange={this.handleChange}
          />
          <button onClick={this.connect}>Connect</button>
      </form>
    </div>
    );
  },
  connect(e) {
    e.preventDefault();
    var serverURL = this.state.value;
    localStorage.setItem("PROXY_TARGET", serverURL);
    this.props.connect(serverURL);
  }
});


function mapStateToProps(state) {
  return {
  }
}

export const ServerSelectionPage = connect(mapStateToProps, actionCreators)(ServerSelection); 
