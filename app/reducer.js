import { session } from './utils';

const initialState = {
  server: session().getServer(),
  username: session().getUsername(),
  connection: null,
  connecting: false,
  connected: false,
  connectionError: null,
  userProfiles: {},
  profileOpenUser: null,
  openGames: [],
  supportedGames: [],
  gameEnded: false,
  gameWinner: null,
  gameActive: false,
  gameMeta: null,
  gameState: {},
};

export default function(state=initialState, action) {
  console.log('action', action);
  switch (action.type) {
    case 'CONNECT': {
      return { ...initialState, connection: action.connection, server: action.url, username: action.username, connecting: true };
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
    case 'OPEN_USER_PROFILE': {
      return { ...state, profileOpenUser: { username: action.username, games: [] } }
    }
    case 'CLOSE_USER_PROFILE': {
      return { ...state, profileOpenUser: null }
    }
    case 'SET_USER_PROFILE': {
      return { ...state, profileOpenUser: { username: action.username, games: action.games } }
    }
    case 'SET_OPEN_GAMES': {
      return { ...state, openGames: action.openGames }
    }
    case 'SET_ALL_SUPPORTED_GAMES': {
      return { ...state, supportedGames: action.games }
    }
    case 'GAME_INIT': {
      return { ...state, gameWinner: null, gameEnded: false, gameActive: false, gameMeta: {
        gameId: action.gameId,
        boardCols: action.boardCols,
        boardRows: action.boardRows,
        checkered: action.checkered,
        needsFlip: action.needsFlip,
        opponents: action.opponents
      } }
    }
    case 'SET_GAME_STATE': {
      return { ...state, gameActive: true, gameState: {
        board: action.board,
        diffs: action.diffs,
        turn: action.turn,
        turnType: action.turn_type,
        myTurn: action.turn === state.username,
        userPool: action.user_pool,
        validMovements: action.valid_movements,
        validPlacements: action.valid_placements,
      } }
    }
    case 'GAME_END': {
      return { ...state, gameWinner: action.winner, gameEnded: true }
    }
  }
  return state;
}

