import React from 'react';

const Firebar = ({fire_model}) => {
  return <div> fire strength: {fire_model.strength} </div>;
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