import React from 'react';

import {Meter} from './meter';

const FIRE_COLOR = '#680000' // a dark red.

const Firebar = ({fire_model}) => {
  const label = 'fire strength: ' + fire_model.strength.toFixed(2);
  return (
    <div>
      <Meter proportion={fire_model.strengthProportion()}
             label={label}
             bar_color={FIRE_COLOR} />
    </div>
  );
}

const StokeButton = ({action_callback, fire_model}) => {
  return (
    <div>
      <Meter proportion={fire_model.cooldown.fractionLeft()} 
             callback={action_callback}
             label={'stoke fire'}/>
    </div>
  );
}

export {Firebar, StokeButton};