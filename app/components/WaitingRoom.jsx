import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

export const WaitingRoomComponent = React.createClass({
  render() {
    const { id, openPug, imJoined, need, joinGame } = this.props;
    return <div>
      { openPug ? <div>
        <h3>{openPug.pugName}</h3>
        <p>{openPug.name}</p>
        <p>Needs {need} more player{need === 1 ? '' : 's'}.</p>
        { imJoined ? null : <button onClick={()=>joinGame(id)}>Join</button> }
      </div> : <p>This is not an open game. It may be full or not exist.</p> }
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
