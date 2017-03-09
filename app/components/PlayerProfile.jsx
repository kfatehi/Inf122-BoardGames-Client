import React from 'react';

export const PlayerProfile = ({
  username,
  games
})=> <div>
  {username}
  {games.map(({
    gameType,
    gamesDraw,
    gamesLost,
    gamesWon
  }, index) => <div key={index}>
    {gameType}: {gamesWon} / {gamesLost} / {gamesDraw}
  </div>)}
</div>;
