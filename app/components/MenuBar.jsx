import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export const MenuBar = ({
  toggle,
  open
})=> <div>
  <Drawer
    docked={false}
    width={200}
    open={open}
    onRequestChange={toggle}
  >
    <MenuItem onTouchTap={toggle}>Profile</MenuItem>
    <MenuItem onTouchTap={toggle}>Close Menu</MenuItem>
  </Drawer>
</div>;

