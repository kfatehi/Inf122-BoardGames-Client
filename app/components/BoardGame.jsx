import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

export const BoardGameComponent = React.createClass({
  render() {
    return <div>this is a board</div>;
  }
});


function mapStateToProps(state, props) {
  return {};
}

export const BoardGame = connect(mapStateToProps, actionCreators)(BoardGameComponent); 
