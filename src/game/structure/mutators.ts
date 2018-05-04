import {State} from './state';

export type Mutator = (_:State) => void;

export const dampenFire = (factor: number): Mutator => (state) => {
  state.fire.dampen(factor);
}

export const noOp: Mutator = (_:State) => {};

export const dampenResource = (name: string,
                               factor: number): Mutator => (state) => {
  state.getResource(name).amount *= factor;
}