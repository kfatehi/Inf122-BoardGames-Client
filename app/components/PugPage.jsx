import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import { Link } from 'react-router';

import { Page } from './Page.jsx';

export const Pug = React.createClass({
  render() {
    const { 
      open,
      username,
      pug,

      joinGame
    } = this.props;
    const imJoined = () => {
      return ~pug.players.indexOf(username);
    }
    const joinView = ()=> <div>
      <button onClick={()=>joinGame(pug.id)}>Join</button>
    </div>;
    const joinedView = ()=> <div>
      render the board. we are joined already...
    </div>;
    const closedView = () => <p>
      You cannot join this game
    </p>;
    const openView = ({ pugName, name }) => <div>
      <ul>
        <li><h3>{pugName}</h3></li>
        <li>{name}</li>
        { imJoined() ? joinedView() : joinView() }
      </ul>
    </div>;
    return <Page>
      { open ? openView(pug) : closedView()}
    </Page>;
  },
});


function mapStateToProps(state, props) {
  let openPug = state.openGames.find(g=>g.id === parseInt(props.params.id));
  return {
    open: !!openPug,
    pug: openPug || {},
    username: state.username,
  }
}

export const PugPage = connect(mapStateToProps, actionCreators)(Pug); 
