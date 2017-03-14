import React from 'react';

export const BoardPosition = React.createClass({
  render() {
    const { row, col, color, onClick } = this.props;
    let style = {
      ...this.props.style,
      position: 'absolute',
      border: '1px solid black',
      backgroundColor: color
    };
    const highlightStyle = {
      ...this.props.style,
      backgroundColor: "red",
      opacity: 0.5
    }
    return <div style={style} onClick={()=>onClick(row, col)}>
      { this.props.highlight ? <div style={highlightStyle} /> : null }
      { this.props.debug ? <span>({col}, {row})</span> : null }
    </div>;
  }
});
