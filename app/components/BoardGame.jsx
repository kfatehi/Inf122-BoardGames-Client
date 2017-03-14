import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Draggable from 'react-draggable';

import { getImagePath } from '../utils';


const POS_SIZE = 50;

export const BoardPiece = React.createClass({
  defaultStyle: function() {
    return {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${getImagePath(this.props.image)})`,
      backgroundSize: '100%',
      position: 'absolute',
      zIndex: 5
    }
  },
  getInitialState() {
    return { style: this.defaultStyle() }
  },
  render() {
    const { style } = this.state;

    const dragStyle = { ...style, zIndex: 6 }

    const dragOpts = {
      position: {x: 0, y:0},
      grid: [POS_SIZE, POS_SIZE],
      onStart: () => {
        this.setState({ style: dragStyle });
      },
      onStop: ()=>{
        this.setState({ style });
      }
    }

    return <Draggable {...dragOpts}><div style={style} /></Draggable>;
  }
});

export const BoardPosition = React.createClass({
  render() {
    const { row, col, color, piece, onClick } = this.props;
    let style = {
      position: 'absolute',
      bottom: row * POS_SIZE,
      left: col * POS_SIZE,
      height: POS_SIZE,
      width: POS_SIZE,
      border: '1px solid black',
      backgroundColor: color
    };
    return <div style={style} onClick={()=>onClick(row, col)}>
      {piece ? <BoardPiece {...piece} /> : null }
    </div>
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
      opponents,
      board,
      myTurn,
      turn,
      turnType,
      gameEnded,
      endText,

      clickBoardPosition
    } = this.props;

    let checker = (row, col) => row % 2 === col % 2 ? '#CCC' : '#666';

    let positions = [];
    for (var i = 0; i < boardRows; i++)
      for (var j = 0; j < boardCols; j++)
        positions.push(<BoardPosition
          key={`r${i}c${j}`}
          row={i} col={j}
          color={checkered ? checker(i, j) : '#ccc'}
          piece={board[j][i]}
          onClick={clickBoardPosition}
        />);

    let boardStyle = {
      width: boardCols * POS_SIZE,
      height: boardRows * POS_SIZE,
      position: 'relative'
    }
    return <div>
      { gameEnded ? <p>{endText}</p> : ( myTurn ? <p>
        It's your turn to {turnType}
      </p> : <p>It's {turn}'s turn to {turnType}</p>) }

      <div style={boardStyle}>{positions}</div>
      <ul>
        <li>{username}</li>
        {opponents.map((name,i) => <li key={i}>{name}</li>)}
      </ul>
    </div>;
  }
});


function mapStateToProps(state, props) {
  const gs = state.gameState;
  const whoWon = () => {
    let w = state.gameWinner;
    if (w && w.length > 0) {
      return `${w} WON!`
    } else {
      return `It's a DRAW!`
    }
  }
  return {
    ...state.gameMeta,
    username: state.username,
    myTurn: gs.myTurn,
    turn: gs.turn,
    turnType: gs.turnType,
    board: gs.board,
    gameEnded: state.gameEnded,
    endText: state.gameEnded ? `The game has ended. ${whoWon()}` : null
  }
}

export const BoardGame = connect(mapStateToProps, actionCreators)(BoardGameComponent); 
