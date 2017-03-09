export const connect = (url, username) => {
  return function(dispatch, getState) {
    if (! getState().connected) {
      dispatch({ type: 'CONNECT', url });
      try {
        const connection = new WebSocket(url);
        console.log('connection built');

        connection.onopen = function () {
          dispatch({ type: 'CONNECTED', connection });

          connection.send(JSON.stringify({
            type: "LOGIN", username
          }))
        };

        connection.onerror = function (error) {
          dispatch({ type: 'CONNECTION_ERROR', error: "Connection error" });
        };

        connection.onmessage = function (message) {
          try {
            dispatch(JSON.parse(message.data));
          } catch (e) {
            dispatch({ type: 'CONNECTION_ERROR', error: "Malformed message" });
          }
        };

        connection.onclose = function (event) {
          dispatch({ type: 'CONNECTION_CLOSED' });
        };

      } catch (error) {
        dispatch({ type: 'CONNECTION_ERROR', error: error.message });
      }
    }
  };
};
