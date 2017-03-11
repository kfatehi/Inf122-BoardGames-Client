import { hashHistory } from 'react-router';

export const connect = (url, username) => {
  return function(dispatch, getState) {
    if (! getState().connected) {
      try {
        const connection = new WebSocket(url);
        dispatch({ type: 'CONNECT', url, connection });

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
            }
          } catch (e) {
            dispatch({ type: 'CONNECTION_ERROR', error: e.stack });
          }
        };

        connection.onclose = function (event) {
          dispatch({ type: 'CONNECTION_CLOSED' });
        };

        connection.onopen = function () {
          dispatch(toServer({ type: "LOGIN", username }))
          dispatch(toServer({ type: "GET_USER_PROFILE", username  }));
          dispatch(toServer({ type: "GET_OPEN_GAMES" }));
          dispatch(toServer({ type: "GET_ALL_SUPPORTED_GAMES" }));
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
