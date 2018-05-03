import * as config from './config';

const MAX_FIRE_STRENGTH = 100;
const MIN_FIRE_STRENGTH = 0;

class Fire {

  constructor(
    public strength: number = MIN_FIRE_STRENGTH) {
  }

  update = (time_elapsed_ms: number): void => {
    let depletion = (
      MAX_FIRE_STRENGTH
      * config.FIRE_DEPLETION_FRAC_PER_SECOND
      * (time_elapsed_ms / 1000));

    this.strength -= depletion;
    if (this.strength < 0) {
      this.strength = 0;
    }
  }

  stoke = (): void => {
    this.strength = MAX_FIRE_STRENGTH;
  }

  dampen = (factor: number): void => {
    this.strength = this.strength * factor
  }

  strengthProportion = (): number => {
    return this.strength / MAX_FIRE_STRENGTH;
  }

  isExtinguished = (): boolean => {
    return this.strength <= 0;
  }
}

export {Fire};