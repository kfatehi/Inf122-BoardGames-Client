import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

export const MenuBar = ({
  open,
  toggle,
  disconnect,
})=> <div>
  <Drawer
    docked={false}
    width={200}
    open={open}
    onRequestChange={toggle}
  >
    <List>
      <ListItem onTouchTap={disconnect}>Disconnect</ListItem>
      <ListItem href="#/pugs/new" onTouchTap={toggle}>Start New Game</ListItem>
      <ListItem href="#/pugs/new" onTouchTap={toggle}>Join Game</ListItem>
    </List>
  </Drawer>
</div>;

