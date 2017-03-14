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
    <MenuItem onTouchTap={toggle}>Menu Item</MenuItem>
    <MenuItem onTouchTap={toggle}>Menu Item 2</MenuItem>
  </Drawer>
</div>;

