import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import { Link } from 'react-router';
import { Page } from './Page.jsx';
import { getImagePath } from '../utils';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  gridList: {
    display: 'flex',
    flexFlow: 'row wrap',
    flextWrap: 'nowrap',
    justifyContent: 'space-around',
  },
  gridTile: {
    width: 180,
    height: 180,
    margin: 'auto',
  },
  iconButton: {
    width: 60,
    height: 60,
    padding: 5,
  },
};

export const Home = React.createClass({
  render() {
    const {
      openGames,
    } = this.props;
    return <Page>
      <h2>Join Game</h2>
      <GridList
        cellHeight={'auto'}
        cols={0}
        padding={20}
        style={styles.gridList}
      >
        {openGames.map((g,i)=>
            <GridTile
              key={i}
              title={g.pugName}
              subtitle={<span>Game: {g.name}<br />Opponent: {g.players[0]} </span>}
              style={styles.gridTile}
              actionIcon={<IconButton
                href={`/pugs/${g.id}`}
                tooltip={<p>Join Game</p>}
                tooltipPosition="top-left"
                style={styles.iconButton}
                ><SocialPersonAdd id="gridIcon" /></IconButton>}
              >
                <img src={getImagePath(g.image)} alt={g.pugName} className="game-thumbnail"/>
              </GridTile>
        )}
      </GridList>
    </Page>
  },
});


function mapStateToProps(state) {
  return {
    openGames: state.openGames,
  }
}

export const HomePage = connect(mapStateToProps, actionCreators)(Home);
