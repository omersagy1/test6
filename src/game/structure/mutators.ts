import {State} from './state';
import {ms} from './time';

export type Mutator = (_:State) => void;

export const and = (...mutators: Mutator[]): Mutator => (state) => {
  mutators.map((m) => m(state));
}

export const dampenFire = (factor: number): Mutator => (state) => {
  state.fire.dampen(factor);
}

export const noOp: Mutator = (_:State) => {};

export const dampenResource = (name: string,
                               factor: number): Mutator => (state) => {
  state.getResource(name).amount *= factor;
}

export const addResource = (name: string,
                            harvest_size: number,
                            cooldown: ms): Mutator => (state) => {
  state.addResource(name, harvest_size, cooldown);
}


export const setMilestone = (name: string): Mutator => (state) => {
  state.milestone_history.setMilestoneReached(name);
}
