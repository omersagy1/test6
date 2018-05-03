import React from 'react';

import {Meter} from './meter';

const Resource = ({name, amount, cooldown_frac_remaining}) {

  return (
    <div>
      {name}: {amount}
      <Meter proportion={cooldown_frac_remaining}/>
    </div>
  );
}