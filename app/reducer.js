const DEFAULT_SERVER = "ws://localhost:4567/games";

const initialState = {
  server: localStorage.getItem("PROXY_TARGET") || DEFAULT_SERVER ,
  username: localStorage.getItem("USERNAME") || '',
  connection: null,
  connecting: false,
  connected: false,
  connectionError: null,
  userProfiles: {},
  openGames: [],
  supportedGames: [],

  pug: null
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
    case 'SET_OPEN_GAMES': {
      return { ...state, openGames: action.openGames }
    }
    case 'SET_ALL_SUPPORTED_GAMES': {
      return { ...state, supportedGames: action.games }
    }
    case 'CREATING_PUG': {
      const pug = { pugName: action.pugName, gameName: action.gameName };
      return { ...state, pug };
    }
    case 'NEWLY_CREATED_GAME': {
      return { ...state, pug: { ...state.pug, id: action.gameId } }
    }
  }
  return state;
}

