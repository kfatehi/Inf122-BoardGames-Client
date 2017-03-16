import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { BoardPosition } from './BoardPosition.jsx';
import { BoardPiece } from './BoardPiece.jsx';

import { coordToPiecePos, isValidMovement, doFlip } from '../utils';

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
      boardSize,

      clickBoardPosition,
      dragStart,
      dragStop,
      clearGameAndRedirect,
    } = this.props;

    const validDrag = pieceId => ({row, col}) => {
      return isValidMovement(validMovements, pieceId, row, col)
    }

    let checker = (row, col) => row % 2 === col % 2 ? '#CCC' : '#666';

    let positions = [];
    let pieces = [];

    let piece, posStyle;

    for (var r = 0; r < boardRows; r++) {
      for (var c = 0; c < boardCols; c++) {
        posStyle =  {
          bottom: doFlip(r, boardRows, needsFlip) * posSize,
          left: doFlip(c, boardCols, needsFlip) * posSize,
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
            boardSize={boardSize}
            row={r} col={c} id={piece.pieceId}
            key={piece.pieceId}
            image={piece.image}
            pieceId={piece.pieceId}
            owner={piece.owner}
            size={posSize}
            dragStart={dragStart}
            dragStop={dragStop}
            disabled={(piece.owner !== username) || !(myTurn && turnType === "move")}
            validDrag={validDrag(piece.pieceId)}
            bounds={'parent'}
            boardRows={boardRows}
            boardCols={boardCols}
            needsFlip={needsFlip}
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
      { gameEnded ? <Dialog
            title={myTurn ? <p> You Lost!!! </p> : <p> You Won!!! </p> }
            modal={true}
            open={true}
            actions={[<FlatButton
              label="Join New Pickup Game"
              onTouchTap={()=>clearGameAndRedirect('/')}
              primary={true}/>,
              <FlatButton
              label="Create New Pickup Game"
              href="#/"
              onTouchTap={()=>clearGameAndRedirect('/pugs/new')}
              primary={false}/>,
              ]}
          >
          </Dialog>
      : ( myTurn ? <p>
        It's your turn to {turnType}
      </p> : <p>It's {turn}'s turn to {turnType}</p>) }

      <div style={boardStyle} className='noSelect'>
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
  const selectPieceSize = () => {
    const clientSizePx = Math.min(innerHeight, innerWidth)
    const margin = clientSizePx / 3;
    const posSizePx = Math.floor((clientSizePx - margin) / boardSize);
    return posSizePx;
  }
  return {
    ...state.gameMeta,
    username: state.username,
    myTurn: gs.myTurn,
    turn: gs.turn,
    turnType: gs.turnType,
    board: gs.board,
    gameEnded: state.gameEnded,
    endText: state.gameEnded ? `The game has ended. ${whoWon()}` : null,
    posSize: selectPieceSize(),
    validMovements: gs.validMovements,
    dragPieceId: gs.dragPieceId,
    boardSize,
  }
}

export const BoardGame = connect(mapStateToProps, actionCreators)(BoardGameComponent);
