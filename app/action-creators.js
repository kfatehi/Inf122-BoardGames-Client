import { hashHistory } from 'react-router';


export const connect = (url, username) => {
  return function(dispatch, getState) {
    if (! getState().connected) {
      dispatch({ type: 'CONNECT', url });
      const connection = new WebSocket(url);

      connection.onopen = function () {
        dispatch({ type: 'CONNECTED', connection });

        connection.send(JSON.stringify({
          type: "LOGIN", username
        }))
      };

      connection.onerror = function (error) {
        dispatch({ type: 'CONNECTION_ERROR', error });
        // go back to server selection page
        hashHistory.push('/connect');
      };

      connection.onmessage = function (message) {
        console.log('server message', message);
      };
    }
  };
};


export const login = () => {
  return { type: 'LOGIN' };
};
