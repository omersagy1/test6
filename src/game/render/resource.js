import React from 'react';

import {Meter} from './meter';

const Resource = ({name, amount, cooldown_fraction_remaining}) => {
  return (
    <div>
      {name}: {amount}
      <Meter proportion={cooldown_fraction_remaining}
             as_button={true} />
    </div>
  );
};


const ResourceList = ({harvesters}) => {
  return harvesters.map((h) => (
    <Resource name={h.resource.name}
              amount={h.resource.amount} 
              cooldown_fraction_remaining={h.cooldownFractionRemaining()} />
  ));
};

export {ResourceList};