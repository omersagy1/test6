import {MilestoneType} from './milestones';
import {ActionType} from './input.js';

// Higher order triggers that produce other triggers.

export const secondsPassed = (seconds) => {
  return ((state) => state.timeElapsedSeconds() > seconds);
}

export const actionPerformed = (action) => {
  return ((state) => state.actionPerformed(action));
}

export const and = (trig1, trig2) => {
  return (state) => { return trig1(state) && trig2(state); }
}

// Triggers that accept a state.

export const fireStoked = actionPerformed(ActionType.STOKE_FIRE);

export const fireIsLow = (state) => { 
  return fireStoked(state) && state.fire.strength < 30;
}

export const oneMinutePassed = secondsPassed(60);

export const fireWentOut = (state) => {
  return (actionPerformed(ActionType.STOKE_FIRE)(state)
          && state.fire.strength <= 0);
}

