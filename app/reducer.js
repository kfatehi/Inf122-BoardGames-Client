const DEFAULT_SERVER = "ws://localhost:4567/games";

const initialState = {
  server: localStorage.getItem("PROXY_TARGET") || DEFAULT_SERVER ,
  username: localStorage.getItem("USERNAME") || '',
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
      return { ...state, connectionError: action.error }
    }
    case 'CONNECTION_CLOSED': {
      return { ...state, connection: null, connected: false, connecting: false }
    }
  }
  return state;
}

