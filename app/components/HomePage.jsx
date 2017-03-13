import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import { Link } from 'react-router';

import { Page } from './Page.jsx';

import { getImagePath } from '../utils';

export const Home = React.createClass({
  render() {
    const {
      openGames,
    } = this.props;
    return <Page>
      {openGames.map((g,i)=><div key={i}>
        <Link to={`/pugs/${g.id}`}>
          <img src={getImagePath(g.image)} alt={g.pugName} className="game-thumbnail"/>
          <span>{g.pugName} ({g.name})</span>
        </Link>

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
