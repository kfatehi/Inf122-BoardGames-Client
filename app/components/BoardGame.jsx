import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Draggable from 'react-draggable';

import { getImagePath } from '../utils';

export const BoardPiece = React.createClass({
  defaultStyle: function() {
    return {
      ...this.props.style,
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
    const { size, bounds, position } = this.props;
    const grid = [size, size];

    const dragStyle = { ...style, zIndex: 6 }

    const dragOpts = {
      bounds,
      grid,
      position,
      onStart: (e, {x, y}) => {
        console.log('start', x, y);
        this.setState({ style: dragStyle });
      },
      onStop: (e, {x, y})=>{
        console.log('stop', x, y);
        this.setState({ style });
      },
      onDrag: (e, {x, y})=>{
        console.log('drag', x, y);
      }
    }

    return <Draggable {...dragOpts}><div style={style} /></Draggable>;
  }
});

export const BoardPosition = React.createClass({
  render() {
    const { row, col, color, onClick } = this.props;
    let style = {
      ...this.props.style,
      position: 'absolute',
      border: '1px solid black',
      backgroundColor: color
    };
    return <div style={style} onClick={()=>onClick(row, col)} />;
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
      posSize,

      clickBoardPosition
    } = this.props;

    let checker = (row, col) => row % 2 === col % 2 ? '#CCC' : '#666';

    let positions = [];
    let pieces = [];

    let piece, posStyle;

    for (var r = 0; r < boardRows; r++) { 
      for (var c = 0; c < boardCols; c++) {
        posStyle =  {
          bottom: r * posSize,
          left: c * posSize,
          height: posSize,
          width: posSize,
        };
        piece = board[c][r];
        positions.push(<BoardPosition
          style={posStyle}
          key={`r${r}c${c}`}
          row={r} col={c}
          color={checkered ? checker(r, c) : '#ccc'}
          onClick={clickBoardPosition}
        />);
        if (piece) {
          pieces.push(<BoardPiece
            style={posStyle}
            key={piece.pieceId}
            image={piece.image}
            pieceId={piece.pieceId}
            owner={piece.owner}
            size={posSize}
            position={{ x: 0, y: 0 }}
            bounds={'parent'}
          />)
        }
      }
    }

    let boardStyle = {
      width: boardCols * posSize,
      height: boardRows * posSize,
      position: 'relative',
      margin: 'auto'
    }
    return <div>
      { gameEnded ? <p>{endText}</p> : ( myTurn ? <p>
        It's your turn to {turnType}
      </p> : <p>It's {turn}'s turn to {turnType}</p>) }

      <div style={boardStyle}>
        {positions}
        {pieces}
      </div>
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
  const boardSize = gs.board.length;
  const clientSizePx = Math.min(innerHeight, innerWidth)
  const margin = clientSizePx / 3;
  const posSizePx = Math.floor((clientSizePx - margin) / boardSize);
  return {
    ...state.gameMeta,
    username: state.username,
    myTurn: gs.myTurn,
    turn: gs.turn,
    turnType: gs.turnType,
    board: gs.board,
    gameEnded: state.gameEnded,
    endText: state.gameEnded ? `The game has ended. ${whoWon()}` : null,
    posSize: posSizePx
  }
}

export const BoardGame = connect(mapStateToProps, actionCreators)(BoardGameComponent); 
