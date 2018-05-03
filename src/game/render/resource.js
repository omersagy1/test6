import React from 'react';

import {Meter} from './meter';

const Resource = ({name,
                   amount,
                   cooldown_fraction_remaining,
                   harvest_callback}) => {
  return (
    <div>
      {name}: {amount}
      <Meter proportion={cooldown_fraction_remaining}
             as_button={true}
             callback={harvest_callback(name)} />
    </div>
  );
};


const ResourceList = ({harvesters, harvest_callback}) => {
  return harvesters.map((h) => (
    <Resource name={h.resource.name}
              amount={h.resource.amount} 
              cooldown_fraction_remaining={h.cooldownFractionRemaining()}
              harvest_callback={harvest_callback} />
  ));
};

export {ResourceList};