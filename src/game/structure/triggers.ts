import {ActionType} from './action';
import {State} from './state';

export type Trigger = (_:State) => boolean;

// Higher order triggers that produce other triggers.

export const secondsPassed = (seconds: number): Trigger => {
  return ((state: State) => state.timeElapsedSeconds() > seconds);
}

export const actionPerformed = (action: ActionType): Trigger => {
  return ((state: State) => state.actionPerformed(action));
}

export const and = (trig1: Trigger, trig2: Trigger): Trigger => {
  return (state: State) => { return trig1(state) && trig2(state); }
}


// Triggers that accept a state.

export const fireStoked: Trigger = actionPerformed(ActionType.STOKE_FIRE);

export const fireIsLow: Trigger = (state) => { 
  return fireStoked(state) && state.fire.strength < 30;
}

export const oneMinutePassed: Trigger = secondsPassed(60);

export const fireWentOut: Trigger = (state) => {
  return (actionPerformed(ActionType.STOKE_FIRE)(state)
          && state.fire.strength <= 0);
}

