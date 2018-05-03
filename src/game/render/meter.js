import React from 'react';

const WIDTH = 300; // px
const HEIGHT = 30; // px
const BAR_COLOR = 'white';
const BG_COLOR = 'gray';

const Meter = ({proportion, callback}) => {
  const outer_style = {
    width: WIDTH,
    height: HEIGHT,
    background: BG_COLOR
  }
  const inner_style = {
    width: WIDTH * proportion,
    height: HEIGHT,
    background: BAR_COLOR
  }
  return (
    <div style={outer_style} onClick={callback}> 
      <div style={inner_style}></div>
    </div>
  );
}

export {Meter};