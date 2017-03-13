import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import { Link } from 'react-router';

import { Page } from './Page.jsx';

import { BoardGame } from './BoardGame.jsx';
import { WaitingRoom } from './WaitingRoom.jsx';

export const Pug = React.createClass({
  render() {
    const { init, params: { id } } = this.props;
    return <Page>
      { init ? <BoardGame /> : <WaitingRoom pugId={id} /> }
    </Page>;
  },
});


function mapStateToProps(state, props) {
  return { init: state.gameActive }
}

export const PugPage = connect(mapStateToProps, actionCreators)(Pug); 
