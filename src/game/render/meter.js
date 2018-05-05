import React from 'react';

const WIDTH = 300; // px
const HEIGHT = 30; // px
const BAR_COLOR = '#909090';
const BG_COLOR = 'dimgray';
const LABEL_COLOR = 'white';

const Meter = ({proportion, label, callback, bar_color}) => {
  const outer_style = {
    width: WIDTH,
    height: HEIGHT,
    background: BG_COLOR,
    color: LABEL_COLOR
  }
  const inner_style = {
    width: WIDTH * proportion,
    height: HEIGHT,
    background: bar_color || BAR_COLOR
  }
  const label_style = {
    position: 'absolute'
  }
  return (
    <div className="meter" style={outer_style} onClick={callback}> 
      <span style={label_style}>{label}</span>
      <div style={inner_style}></div>
    </div>
  );
}

export {Meter};