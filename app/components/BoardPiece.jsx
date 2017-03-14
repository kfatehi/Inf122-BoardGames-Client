import React from 'react';
import { getImagePath } from '../utils';
import Draggable from 'react-draggable';

const piecePosToCoord = (size, x, y, row, col) => {
  let newRow = Math.round(row + (y / (-size)));
  let newCol = Math.round(col + (x / (size)));
  console.log(newRow, newCol);
  return { col: newCol, row: newRow };
}

export const BoardPiece = React.createClass({
  defaultStyle: function() {
    return {
      ...this.props.style,
      backgroundImage: `url(${getImagePath(this.props.image)})`,
      backgroundSize: '100%',
      position: 'absolute',
      zIndex: 5
    }
  },
  getInitialState() {
    return { style: this.defaultStyle() }
  },
  render() {
    const { style } = this.state;
    const { id, size, bounds, position, row, col, dragStart, dragStop, disabled } = this.props;
    const grid = [size, size];

    const dragStyle = { ...style, zIndex: 6 }

    const dragOpts = {
      bounds,
      grid,
      position,
      disabled,
      onStart: (e, {x, y}) => {
        this.setState({ style: dragStyle });
        dragStart(id);
      },
      onStop: (e, {x, y})=>{
        this.setState({ style });
        dragStop(id, piecePosToCoord(size, x, y, row, col));
      }
    }

    return <Draggable {...dragOpts}><div style={style} /></Draggable>;
  }
});
