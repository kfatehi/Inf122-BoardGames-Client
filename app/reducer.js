const DEFAULT_SERVER = "ws://localhost:4567/games";

const initialState = {
  server: sessionStorage.getItem("PROXY_TARGET") || DEFAULT_SERVER ,
  username: sessionStorage.getItem("USERNAME") || '',
  connection: null,
  connecting: false,
  connected: false,
  connectionError: null,
  userProfiles: {},
  openGames: [],
  supportedGames: [],
  gameInited: false
};

export default function(state=initialState, action) {
  console.log('action', action);
  switch (action.type) {
    case 'CONNECT': {
      return { ...state, connection: action.connection, connectionError: null, server: action.url, username: action.username, connected: false, connecting: true };
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
    case 'SET_OPEN_GAMES': {
      return { ...state, openGames: action.openGames }
    }
    case 'SET_ALL_SUPPORTED_GAMES': {
      return { ...state, supportedGames: action.games }
    }
    case 'GAME_INIT': {
      return { ...state, gameInited: true }
    }
  }
  return state;
}

