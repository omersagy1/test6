import React from 'react';

import {Meter} from './meter';

const Resource = ({name, amount, cooldown_fraction_remaining}) {

  return (
    <div>
      {name}: {amount}
      <Meter proportion={cooldown_fraction_remaining}/>
    </div>
  );
};


const ResourceList = ({resources}) {
  return resources.map((r) => (
    <Resource name={r.name}
              amount={r.amount}
              cooldown_fraction_remaining={cooldown_fraction_remaining} />
  );
};

export {ResourceList};