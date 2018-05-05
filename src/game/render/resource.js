import React from 'react';

import {Meter} from './meter';

const Resource = ({name,
                   amount,
                   cooldown_fraction_remaining,
                   harvest_callback}) => {
  let label = name + ': ' + amount;
  return (
    <div>
      <Meter proportion={cooldown_fraction_remaining}
             label={label}
             callback={() => harvest_callback(name)} />
    </div>
  );
};


const ResourceList = ({harvesters, harvest_callback}) => {
  return harvesters.map((h) => (
    <Resource name={h.resource.name}
              key={h.resource.name}
              amount={h.resource.amount} 
              cooldown_fraction_remaining={h.cooldownFractionRemaining()}
              harvest_callback={harvest_callback} />
  ));
};

export {ResourceList};