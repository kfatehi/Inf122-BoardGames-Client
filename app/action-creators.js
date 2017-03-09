export const connect = (url) => {
  return function(dispatch) {
    dispatch({ type: 'CONNECT', url });
    const connection = new WebSocket(url);

    connection.onopen = function () {
      dispatch({ type: 'CONNECTED', connection });
    };

    connection.onerror = function (error) {
      dispatch({ type: 'CONNECTION_ERROR', error });
    };

    connection.onmessage = function (message) {
      console.log('server message', message);
    };
  };
};


export const login = () => {
  return { type: 'LOGIN' };
};
