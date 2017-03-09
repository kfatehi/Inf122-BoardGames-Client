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
            dispatch(JSON.parse(message.data));
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
