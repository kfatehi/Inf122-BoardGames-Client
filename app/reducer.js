const DEFAULT_SERVER = "ws://localhost:4567/games";

const initialState = {
  server: localStorage.getItem("PROXY_TARGET") || DEFAULT_SERVER ,
  username: localStorage.getItem("USERNAME") || '',
  connection: null,
  connecting: false,
  connected: false,
  connectionError: null,
  userProfiles: {}
};

export default function(state=initialState, action) {
  console.log('action', action);
  switch (action.type) {
    case 'CONNECT': {
      return { ...state, connection: action.connection, connectionError: null, server: action.url, connected: false, connecting: true };
    }
    case 'CONNECTION_ERROR': {
      return { ...state, connectionError: action.error }
    }
    case 'CONNECTION_CLOSED': {
      return { ...state, connection: null, connected: false, connecting: false }
    }
    case 'LOGIN_SUCCESS': {
      return { ...state, connectionError: null, connected: true, connecting: false };
    }
    case 'LOGIN_ERROR': {
      return { ...state, connectionError: action.errorMessage }
    }
    case 'SET_USER_PROFILE': {
      const entry = { [action.username]: { games: action.games } };
      return { ...state, userProfiles: { ...state.userProfiles, ...entry } }
    }
  }
  return state;
}

