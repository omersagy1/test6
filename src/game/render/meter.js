import React from 'react';

const WIDTH = 300; // px
const HEIGHT = 30; // px
const COLOR = 'red';

const Meter = ({proportion}) => {
  const style = {
    width: WIDTH * proportion,
    height: HEIGHT,
    background: COLOR
  }

  return <div style={style}></div>
}

export {Meter};