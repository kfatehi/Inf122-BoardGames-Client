import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import { Link } from 'react-router';
import { Page } from './Page.jsx';
import { getImagePath } from '../utils';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
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

export const NewPug = React.createClass({
  getInitialState() {
    return { gameName: null, pugName: '',};
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
  closeDialog() {
      this.setState({gameName: null});
  },
  render() {
    return <Page>
      <h2>Create New Game</h2>
      <GridList
        cellHeight={'auto'}
        cols={0}
        padding={20}
        style={styles.gridList}
      >
        { this.state.gameName ? <Dialog
            title="Name Your New Pick Up Game"
            modal={false}
            actions={[<FlatButton
              label="Start"
              onTouchTap={this.submit}
              disabled={!this.isValid()}
              primary={true}/>,
              <FlatButton
              label="Cancel"
              onTouchTap={this.closeDialog}
              primary={false}/>,
              ]}
            open={!!this.state.gameName}
            onRequestClose={this.closeDialog}
          >
            <form onSubmit={this.submit}>
              <TextField
                floatingLabelText="New Game Name"
                value={this.state.pugName}
                onChange={(e)=>this.setState({ pugName: e.target.value})}
                fullWidth={true}
              /><br />
              <input type="submit" style={{position: 'absolute', left: -9999}}/>
            </form>
          </Dialog>
        : this.props.supportedGames.map(({name, image, maxPlayers}, i)=>
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
              tooltip={<p>Start a Game of {name}</p>}
              tooltipPosition="top-left"
              style={styles.iconButton}
              ><ContentAddCircle id="gridIcon" /></IconButton>}
            >
              <img src={getImagePath(image)} alt={name} className="game-thumbnail"/>
            </GridTile>
          )
        }
      </GridList>
  </Page>;
  },
});


function mapStateToProps(state) {
  return {
    supportedGames: state.supportedGames
  };
}

export const NewPugPage = connect(mapStateToProps, actionCreators)(NewPug);
