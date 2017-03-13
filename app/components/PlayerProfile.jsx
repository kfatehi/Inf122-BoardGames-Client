import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

export const PlayerProfile = ({
  username,
  games,
  closeAction
})=> <Card>
  <CardTitle
    title={username}
    subtitle="Player Profile"
  />
  <CardText>
    <List>
      {games.map(({
        gameType,
        gamesDraw,
        gamesLost,
        gamesWon
      }, index) => <ListItem key={index} primaryText={gameType}
        secondaryText={
          <p>
            {gamesWon}-{gamesDraw}-{gamesLost}
          </p>
        }
      />)}
    </List>
    <button onClick={closeAction}>Close</button>
  </CardText>
</Card>;
