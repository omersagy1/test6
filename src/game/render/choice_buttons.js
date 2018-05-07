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
  const style = {
    width: 92,
    height: 30,
    background: 'dimgray',
    color: 'white',
    borderColor: 'yellow',
    borderWidth: 3,
    borderStyle: 'solid',
    fontSize: 16,
    marginTop: 20,
    marginRight: 10,
    marginBottom: 10,
    display: 'inline-block'
  };
  const label_style = {
    width: 92,
    height: 30,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const specific_callback = () => { action_callback(text) };
  return (
    <div style={style} onClick={specific_callback}>
      <div style={label_style}>{text}</div>
    </div>
  );
}

export {ChoiceButtonRow};