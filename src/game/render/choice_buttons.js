import React from 'react';

const ChoiceButtonRow = ({action_callback, active_event}) => {
  if (!active_event) {
    return null;
  }
  const buttons = active_event.choices.map(
    (c) => <ChoiceButton action_callback={action_callback}
                         text={c.text}
                         key={c.text} />);
  return (
    <div>{buttons}</div>
  );
}

const ChoiceButton = ({action_callback, text}) => {
  const specific_callback = () => { action_callback(text) };
  return <button onClick={specific_callback}>{text}</button>;
}

export {ChoiceButtonRow};