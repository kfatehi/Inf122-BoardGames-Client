import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const POS_SIZE = 50;

export const BoardPosition = React.createClass({
  render() {
    const { row, col, color } = this.props;
    let style = {
      position: 'absolute',
      top: row * POS_SIZE,
      left: col * POS_SIZE,
      height: POS_SIZE,
      width: POS_SIZE,
      backgroundColor: color
    };
    return <div style={style}></div>
  }
});

export const BoardGameComponent = React.createClass({
  render() {
    const { 
      username,
      boardCols,
      boardRows,
      checkered,
      needsFlip,
      opponents
    } = this.props;

    let checker = (row, col) => row % 2 === col % 2 ? '#CCC' : '#000';

    let positions = [];
    for (var i = 0; i < boardRows; i++)
      for (var j = 0; j < boardCols; j++)
        positions.push(<BoardPosition
          key={`r${i}c${j}`}
          row={i} col={j}
          color={checkered ? checker(i, j) : '#ccc'}
        />);

    let boardStyle = {
      width: boardCols * POS_SIZE,
      height: boardRows * POS_SIZE,
      position: 'relative'
    }
    return <div>
      <div style={boardStyle}>{positions}</div>
      <ul>
        <li>{username}</li>
        {opponents.map((name,i) => <li key={i}>{name}</li>)}
      </ul>
    </div>;
  }
});


function mapStateToProps(state, props) {
  return {
    ...state.gameMeta,
    username: state.username
  }
}

export const BoardGame = connect(mapStateToProps, actionCreators)(BoardGameComponent); 
