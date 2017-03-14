import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import CircularProgress from 'material-ui/CircularProgress';

export const WaitingRoomComponent = React.createClass({
  render() {
    const { id, openPug, imJoined, need, joinGame } = this.props;
    return <div>
      { openPug ? <div>
        <h2>Waiting Room: <span style={{color: '#00BCD4'}}>{openPug.pugName}</span></h2>
        <p>Game: {openPug.name}</p>
        <p>Waiting for {need} more player{need === 1 ? '' : 's'}.</p>
        <CircularProgress size={80} thickness={5} />
        { imJoined ? null : <span>{joinGame(id)}</span>}
      </div> : <div>
      <p>This is not an open game. It may be full or not exist.</p>
      <p><Link to="/">Click here to go back home</Link></p>
    </div> }
    </div>
  }
});


function mapStateToProps(state, props) {
  const { username, openGames } = state;
  const id = parseInt(props.pugId);
  const openPug = openGames.find(g=>g.id === id);
  const imJoined = openPug ? ~openPug.players.indexOf(username) : null;
  const need = openPug ? openPug.maxPlayers - openPug.players.length : null;
  return { id, openPug, imJoined, need };
}

export const WaitingRoom = connect(mapStateToProps, actionCreators)(WaitingRoomComponent);
