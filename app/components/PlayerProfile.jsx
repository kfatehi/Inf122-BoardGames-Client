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
    modal={false}
    actions={[<FlatButton label="Close" onTouchTap={closeAction} primary={true}/>]}
    open={open}
    onRequestClose={closeAction}
  >{ open ?
    <span>
    <CardTitle
      title={"Player Profile: " + profile.username}
      subtitle="Win-Tie-Loss"
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
