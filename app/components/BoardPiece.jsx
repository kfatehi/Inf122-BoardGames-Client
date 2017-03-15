import React from 'react';
import { piecePosToCoord, getImagePath, doFlip } from '../utils';
import Draggable from 'react-draggable';

export const BoardPiece = React.createClass({
  defaultStyle: function() {
    return {
      backgroundImage: `url(${getImagePath(this.props.image)})`,
      backgroundSize: '100%',
      height: this.props.size,
      width: this.props.size,
      position: 'absolute',
      zIndex: 5
    }
  },
  getInitialState() {
    return {
      style: this.defaultStyle(),
      position: this.calcPosition(this.props)
    }
  },
  calcPosition({ row, col, size, boardSize, boardRows, needsFlip }) {
    return {
      x: col * size,
      y: - ( (doFlip(row, boardRows, needsFlip) + 1) * size ) + ( boardSize * size )
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({ position: this.calcPosition(nextProps) });
  },
  render() {
    const { style, position } = this.state;
    const { id, size, bounds, row, col, dragStart, dragStop, disabled, validDrag } = this.props;
    const grid = [size, size];

    const dragStyle = { ...style, zIndex: 6 }

    const dragOpts = {
      bounds,
      grid,
      position: this.state.position,
      disabled,
      onStart: (e, {x, y}) => {
        this.setState({ style: dragStyle, prevPosition: { x, y } });
        dragStart(id);
      },
      onStop: ()=>{
        this.setState({ style });
        const { x , y } = this.state.position;
        const attempt = piecePosToCoord(size, x, y, row, col, this.props.boardSize, this.props.boardRows, this.props.needsFlip)
        dragStop(id, attempt);
        if (!validDrag(attempt)) {
          this.setState({ position: this.state.prevPosition });
        }
      },
      onDrag: (e, {x, y}) => {
        this.setState({ position: { x, y } });
      }
    }

    return <Draggable {...dragOpts}><div style={style} /></Draggable>;
  }
});
