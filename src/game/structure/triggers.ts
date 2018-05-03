import {ActionType} from './action';
import {State} from './state';
import {secs} from './time';

export type Trigger = (_:State) => boolean;

// Higher order triggers that produce other triggers.

export const timePassed = (t: secs): Trigger => {
  return ((state: State) => state.timeElapsed() > t);
}

export const actionPerformed = (action: ActionType): Trigger => {
  return ((state: State) => state.actionPerformed(action));
}

export const actionEverPerformed = (action: ActionType): Trigger => {
  return ((state: State) => state.actionEverPerformed(action));
}

export const and = (trig1: Trigger, trig2: Trigger): Trigger => {
  return (state: State) => { return trig1(state) && trig2(state); }
}

// Triggers that accept a state.

export const fireStoked: Trigger = actionPerformed(ActionType.STOKE_FIRE);

export const fireIsLow: Trigger = (state) => { 
  return (actionEverPerformed(ActionType.STOKE_FIRE)(state) 
          && state.fire.strength < 30);
}

export const oneMinutePassed: Trigger = timePassed(60 as secs);

export const fireWentOut: Trigger = (state) => {
  return (actionEverPerformed(ActionType.STOKE_FIRE)(state)
          && state.fire.isExtinguished());
}
