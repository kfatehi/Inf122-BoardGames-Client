import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import { Link } from 'react-router';

import { Page } from './Page.jsx';

import { getImagePath } from '../utils';

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
      <form onSubmit={(e)=>e.preventDefault()}>
      { this.state.gameName ? <input
        type="text"
        value={this.state.pugName}
        placeholder="name"
        onChange={(e)=>this.setState({ pugName: e.target.value})}
      /> : this.props.supportedGames.map(({
        name, image, maxPlayers
      }, i)=><div key={i}>
        <a href="#" onClick={(e)=>{
          e.preventDefault();
          this.setState({ gameName: name });
        }}>
          <img src={getImagePath(image)} alt={name} className="game-thumbnail"/>
          <span>{name}</span>
        </a>
      </div>)
      }

      <button onClick={this.props.router.goBack}>Cancel</button>
      <button disabled={!this.isValid()} type="submit" onClick={this.submit}>Submit</button>
    </form>
  </Page>;
  },
});


function mapStateToProps(state) {
  return {
    supportedGames: state.supportedGames
  };
}

export const NewPugPage = connect(mapStateToProps, actionCreators)(NewPug); 
