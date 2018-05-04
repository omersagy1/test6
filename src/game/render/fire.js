import React from 'react';

import {Meter} from './meter';

const Firebar = ({fire_model}) => {
  return (
    <div>
      <Meter proportion={fire_model.strengthProportion()} />
      <div> fire strength: {fire_model.strength} </div>
    </div>
  );
}

const StokeButton = ({action_callback, fire_model}) => {
  return (
    <div>
      <Meter proportion={fire_model.cooldown.fractionLeft()} />
      <button onClick={action_callback}>
        stoke fire
      </button>
    </div>
  );
}

export {Firebar, StokeButton};