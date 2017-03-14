import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import { Link } from 'react-router';
import { Page } from './Page.jsx';
import { getImagePath } from '../utils';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

const styles = {
  root: {
    //display: 'flex',
    //flexWrap: 'wrap',
    //justifyContent: 'center',
  },
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

export const NewPug = React.createClass({
  getInitialState() {
    return { gameName: null, pugName: '' };
  },
  submit() {
    const { gameName, pugName } = this.state;
    if (this.isValid()) {
      this.props.createGame(gameName, pugName);
    }
  },
  isValid() {
    const { gameName, pugName } = this.state;
    return gameName && pugName && pugName.length > 0;
  },
  render() {
    return <Page>
      <h2>Start New Game</h2>
      <div style={styles.root}>
        <GridList
          cellHeight={'auto'}
          cols={0}
          padding={20}
          style={styles.gridList}
        >
          { this.state.gameName ? <input
            type="text"
            value={this.state.pugName}
            placeholder="name"
            onChange={(e)=>this.setState({ pugName: e.target.value})}
            /> : this.props.supportedGames.map(({
              name, image, maxPlayers
            }, i)=>
              <GridTile
                key={i}
                title={name}
                subtitle={<span>Max Players: <b>{maxPlayers}</b></span>}
                style={styles.gridTile}
                actionIcon={<IconButton
                  href="#"
                  onTouchTap={(e)=>{
                    e.preventDefault();
                    this.setState({ gameName: name });
                  }}
                  tooltip="Create Pick Up Game"
                  tooltipPosition="top-left"
                  style={styles.iconButton}
                ><ContentAddCircle id="gridIcon" /></IconButton>}
              >
                <img src={getImagePath(image)} alt={name} className="game-thumbnail"/>
                </GridTile>
            )}
      </GridList>
    </div>
          <button onClick={this.props.router.goBack}>Cancel</button>
          <button disabled={!this.isValid()} type="submit" onClick={this.submit}>Submit</button>
  </Page>;
  },
});


function mapStateToProps(state) {
  return {
    supportedGames: state.supportedGames
  };
}

export const NewPugPage = connect(mapStateToProps, actionCreators)(NewPug);
