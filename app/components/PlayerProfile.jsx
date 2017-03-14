import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

export const PlayerProfile = ({
  closeAction,
  open,
  profile,
})=> <Dialog
    title="Player Profile"
    modal={true}
    actions={[<FlatButton label="Close" onTouchTap={closeAction} primary={true}/>]}
    open={open}
    onRequestClose={closeAction}
  >{ open ?
    <span>
    <CardHeader
      title={profile.username}
      avatar="../../player.png"
      style={{padding: "16px 16px 0 16px"}}
    />
    <CardText style={{padding: "0 16px 16px 16px"}}>
      <List>
        {profile.games.map(({
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
    </CardText>
  </span>
  : null}
</Dialog>;
