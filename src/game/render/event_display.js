import React from 'react';

const MAX_NUM_LINES = 10; // number of lines in the display history
const OPACITY_FALLOFF = .7; // approx opacity of the second line
const LINE_MARGIN = 10; // pixels

const EventDisplay = ({messages}) => {
  const lines = messages.reverse();

  const line_divs = [];
  for (let [i, l] of lines.entries()) {
    let opacity = 1; 
    if (i > 0) {
      opacity = OPACITY_FALLOFF * (MAX_NUM_LINES - i) / MAX_NUM_LINES;
    }
    line_divs.push(
      <LineDisplay line={l}
                   key={i}
                   opacity={opacity} />
    );
  }

  return <div>{line_divs}</div>;
}

const LineDisplay = ({line, opacity}) => {
  const style = {
    marginBottom: LINE_MARGIN,
    opacity: opacity
  };
  return <div style={style}>{line}</div>;
}

export {EventDisplay};