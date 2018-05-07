import {ActionType} from './action';
import {State} from './state';
import {secs} from './time';
import {SystemEventType} from './system_event';

export type Trigger = (_:State) => boolean;

// Higher order triggers that produce other triggers.

export const timePassed = (t: secs): Trigger => {
  return ((state: State) => state.timeElapsed() > t);
};

export const actionPerformed = (action: ActionType): Trigger => {
  return ((state: State) => state.actionPerformed(action));
};

export const actionEverPerformed = (action: ActionType): Trigger => {
  return ((state: State) => state.actionEverPerformed(action));
};

export const and = (trig1: Trigger, trig2: Trigger): Trigger => {
  return (state: State) => { return trig1(state) && trig2(state); }
};

export const timeSinceMilestone = (name: string, s: secs) => {
  return (state: State) => {
    return (state.milestone_history.didReachMilestone(name)
            && state.milestone_history.timeSinceMilestone(name) / 1000 > s);
  };
};

// This relies on the system event history being cleared every frame.
export const systemEventDispatched = (t: SystemEventType) => {
  return (state: State) => {
    return state.system_event_history.hasEventType(t);
  };
};

// Triggers that accept a state.

export const fireStoked: Trigger = systemEventDispatched(
  SystemEventType.FIRE_STOKED);

export const fireIsLow: Trigger = (state) => { 
  return (actionEverPerformed(ActionType.STOKE_FIRE)(state) 
          && state.fire.strength < 30);
};

export const oneMinutePassed: Trigger = timePassed(60 as secs);

export const fireWentOut: Trigger = (state) => {
  return (actionEverPerformed(ActionType.STOKE_FIRE)(state)
          && state.fire.isExtinguished());
};
