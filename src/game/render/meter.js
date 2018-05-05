import React from 'react';

const WIDTH = 300; // px
const HEIGHT = 30; // px
const BAR_COLOR = 'gray';
const BG_COLOR = 'dimgray';
const LABEL_COLOR = 'white';

const Meter = ({proportion, label, callback}) => {
  const outer_style = {
    width: WIDTH,
    height: HEIGHT,
    background: BG_COLOR,
    color: LABEL_COLOR
  }
  const inner_style = {
    width: WIDTH * proportion,
    height: HEIGHT,
    background: BAR_COLOR
  }
  const label_style = {
    position: 'absolute'
  }
  return (
    <div style={outer_style} onClick={callback}> 
      <span style={label_style}>{label}</span>
      <div style={inner_style}></div>
    </div>
  );
}

export {Meter};