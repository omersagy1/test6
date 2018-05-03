import React from 'react';

import {Meter} from './meter';

const Firebar = ({fire_model}) => {
  return ([
      <Meter proportion={fire_model.strengthProportion()} />,
      <div> fire strength: {fire_model.strength} </div>
    ]);
}

const StokeButton = ({action_callback}) => {
  return (
    <div>
      <button onClick={action_callback}>
        stoke fire
      </button>
    </div>
  );
}

export {Firebar, StokeButton};