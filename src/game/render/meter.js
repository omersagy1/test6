import React from 'react';

const WIDTH = 200; // px
const HEIGHT = 30; // px
const BAR_COLOR = '#909090';
const BG_COLOR = 'dimgray';
const LABEL_COLOR = 'white';

const ACTIVE_BORDER_COLOR = 'yellow';
const INACTIVE_BORDER_COLOR = 'darkgray';
const BORDER_WIDTH = '1px';

const Meter = ({proportion, label, callback, bar_color}) => {
  let border_color;
  if (proportion == 0) {
    border_color = ACTIVE_BORDER_COLOR;
  } else {
    border_color = INACTIVE_BORDER_COLOR;
  }

  const outer_style = {
    width: WIDTH,
    height: HEIGHT,
    background: BG_COLOR,
    color: LABEL_COLOR,
    borderColor: border_color,
    borderWidth: '1px',
    borderStyle: 'solid',
    fontSize: 16
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