const initialState = {
  server: null,
  connection: null,
  connecting: false,
  connected: false,
  connectionError: null,
};


export default function(state=initialState, action) {
  console.log('action', action);
  switch (action.type) {
    case 'CONNECT': {
      return { ...state, connection: null, connectionError: null, server: action.url, connected: false, connecting: true };
    }
    case 'CONNECTED': {
      return { ...state, connection: action.connection, connectionError: null, connected: true, connecting: false };
    }
    case 'CONNECTION_ERROR': {
      return { ...state, connection: null, connectionError: action.error, connected: false, connecting: false };
    }
  }
  return {};
}

