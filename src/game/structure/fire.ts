import * as config from './config';
import {Cooldown} from './cooldown';
import {secs, ms} from './time';

const MAX_FIRE_STRENGTH = 100;
const MIN_FIRE_STRENGTH = 0;

const STOKE_COOLDOWN: secs = 10;

class Fire {

  constructor(
    public strength: number = MIN_FIRE_STRENGTH,
    public cooldown = new Cooldown(STOKE_COOLDOWN * 1000 as ms)) {}

  update = (time_elapsed: ms): void => {
    let depletion = (
      MAX_FIRE_STRENGTH
      * config.FIRE_DEPLETION_FRAC_PER_SECOND
      * (time_elapsed / 1000));

    this.strength -= depletion;
    if (this.strength < 0) {
      this.strength = 0;
    }

    this.cooldown.update(time_elapsed);
  }

  canStoke = (): boolean => {
    return !this.cooldown.isActive();
  }

  stoke = (): void => {
    if (!this.cooldown.isActive()) {
      this.strength = MAX_FIRE_STRENGTH;
      this.cooldown.begin();
    }
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