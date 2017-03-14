import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import { BoardPosition } from './BoardPosition.jsx';
import { BoardPiece } from './BoardPiece.jsx';

import { isValidMovement } from '../utils';

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
      validMovements,
      dragPieceId,

      clickBoardPosition,
      dragStart,
      dragStop
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
          highlight={dragPieceId ? !isValidMovement(validMovements, dragPieceId, r, c) : false}
          onClick={clickBoardPosition}
          debug
        />);
        if (piece) {
          pieces.push(<BoardPiece
            id={piece.pieceId}
            style={posStyle}
            key={piece.pieceId}
            image={piece.image}
            pieceId={piece.pieceId}
            owner={piece.owner}
            row={r} col={c}
            size={posSize}
            dragStart={dragStart}
            dragStop={dragStop}
            position={{ x: 0, y: 0 }}
            disabled={!(myTurn && turnType === "move")}
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
    posSize: posSizePx,
    validMovements: gs.validMovements,
    dragPieceId: gs.dragPieceId
  }
}

export const BoardGame = connect(mapStateToProps, actionCreators)(BoardGameComponent); 
