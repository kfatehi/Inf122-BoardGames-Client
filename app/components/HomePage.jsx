import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import { Link } from 'react-router';

import { Page } from './Page.jsx';

export const Home = React.createClass({
  render() {
    const {
      openGames,
    } = this.props;
    return <Page>
      {openGames.map((g,i)=><div key={i}>
        an open game
      </div>)}

      <Link to="/pugs/new">Start a new game</Link>
    </Page>
  },
});


function mapStateToProps(state) {
  return {
    openGames: state.openGames,
  }
}

export const HomePage = connect(mapStateToProps, actionCreators)(Home); 
