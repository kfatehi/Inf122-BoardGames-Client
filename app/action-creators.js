import { hashHistory } from 'react-router';

import { isValidMovement } from './utils';

export const connect = (url, username) => {
  return function(dispatch, getState) {
    if (! getState().connected) {
      try {
        let keepalive;
        const connection = new WebSocket(url);
        dispatch({ type: 'CONNECT', url, connection, username });

        connection.onerror = function (error) {
          dispatch({ type: 'CONNECTION_ERROR', error: "Connection error" });
        };

        connection.onmessage = function (message) {
          try {
            let action = JSON.parse(message.data);
            dispatch(action);
            switch (action.type) {
              case 'NEWLY_CREATED_GAME': {
                hashHistory.push(`/pugs/${action.gameId}`)
              }
              case 'GAME_INIT': {
                hashHistory.replace(`/pugs/${action.gameId}`)
              }
            }
          } catch (e) {
            console.error(e.stack);
            dispatch({ type: 'CONNECTION_ERROR', error: e.stack });
          }
        };

        connection.onclose = function (event) {
          dispatch({ type: 'CONNECTION_CLOSED' });

          clearInterval(keepalive);
        };

        connection.onopen = function () {
          dispatch(toServer({ type: "LOGIN", username }))
          dispatch(toServer({ type: "GET_OPEN_GAMES" }));
          dispatch(toServer({ type: "GET_ALL_SUPPORTED_GAMES" }));

          keepalive = setInterval(()=> dispatch(toServer({ type: "PING" })), 10 * 1000);
        };
      } catch (error) {
        dispatch({ type: 'CONNECTION_ERROR', error: error.message });
      }
    }
  };
};

export const disconnect = () => {
  return function(dispatch, getState) {
    getState().connection.close();
  }
}

export const toServer = (action) => {
  return function(dispatch, getState) {
    getState().connection.send(JSON.stringify(action));
  }
};

export const createGame = (gameName, pugName) => {
  return function(dispatch, getState) {
    dispatch({ type: "CREATING_PUG", gameName, pugName });
    dispatch(toServer({ type: 'CREATE_GAME', gameName, pugName }));
  }
};

export const joinGame = (gameId) => {
  return toServer({ type: "JOIN_GAME", gameId });
}

export const clickBoardPosition = (row, col) => {
  console.log('placement', row, col);
  return function(dispatch, getState) {
    const { myTurn, turnType, userPool, validPlacements } = getState().gameState;
    if ( myTurn && turnType === 'place' ) {
      const piece = userPool[0];
      const isValid = piece && validPlacements.reduce((acc, {c,r})=>{
        if (acc) return acc;
        return c == col && row === r;
      }, false);
      if (isValid) {
        dispatch(toServer({ type: 'TURN', c: col, r: row, pieceID: piece.id }));
      }
    }
  }
}

export const openProfile = (username) => {
  return function(dispatch, getState) {
    dispatch({ type: "OPEN_USER_PROFILE", username });
    dispatch(toServer({ type: "GET_USER_PROFILE", username }));
  }
}

export const closeProfile = () => {
  return { type: "CLOSE_USER_PROFILE" }
}

export const toggleMenuBar = () => {
  return { type: "TOGGLE_MENUBAR" }
}

export const dragStart = (pieceId) => {
  return function(dispatch, getState) {
    dispatch({ type: "DRAG_START", id: pieceId });
  }
}

export const dragStop = (pieceID, { row, col }) => {
  return function(dispatch, getState) {
    dispatch({ type: "DRAG_STOP" });
    const { validMovements } = getState().gameState;
    if (isValidMovement(validMovements, pieceID, row, col)) {
      dispatch(toServer({ type: 'TURN', pieceID, c: col, r: row }));
    }
  }
}
