export function session() {
  const DEFAULT_SERVER = "ws://localhost:4567/games";
  return {
    getServer: () => sessionStorage.getItem("PROXY_TARGET") || DEFAULT_SERVER,
    getUsername: () => sessionStorage.getItem("USERNAME") || '',
    setServer: (val) => sessionStorage.setItem("PROXY_TARGET", val),
    setUsername: (val) => sessionStorage.setItem("USERNAME", val)
  }
}

export function getImagePath(imagePath) {
  if (imagePath[0] === '/') {
    // it's a relative path. reuse the websocket host
    let url = new URL(session().getServer())
    url.protocol = url.protocol.replace('ws', 'http');
    url.pathname = imagePath;
    return url.toString();
  } else {
    return imagePath;
  }
}

export function isValidMovement(moves, id, row, col) {
  let pieceMoves = moves.find(i=>i.pieceId === id);
  if (pieceMoves) {
    let move = pieceMoves.moves.find(({c,r})=> c===col && r===row);
    if (move) return true;
  }
  return false;
}

export const piecePosToCoord = (size, x, y, row, col, boardSize) => {
  const flip = (n) => (boardSize * size) - n - size;
  let newRow = flip(y) / size;
  let newCol = x / size;
  return { col: newCol, row: newRow };
}
