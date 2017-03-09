import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

export const Home = React.createClass({
  render() {
    return (
      <div>
        home
      </div>
    );
  },
});


function mapStateToProps(state) {
  return {
  }
}

export const HomePage = connect(mapStateToProps, actionCreators)(Home); 
