import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

export const PlayerProfile = ({
  username,
  games,
  closeAction
})=> <Card>
  <CardHeader
    title={username}
    subtitle="Player Profile"
    avatar="../../player.png"
    style={{padding: "16px 16px 0 16px"}}
  />
  <CardText style={{padding: "0 16px 16px 16px"}}>
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
    <CardActions>
      <FlatButton label="Close" onTouchTap={closeAction} />
    </CardActions>
  </CardText>
</Card>;
