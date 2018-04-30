const MAX_FIRE_STRENGTH = 100;
const MIN_FIRE_STRENGTH = 0;
// This means the fire loses 5% strength per second.
const FIRE_DEPLETION_FRAC_PER_SECOND = .05;

class Fire {

  constructor(
    public strength: number = MIN_FIRE_STRENGTH) {
  }

  update = (time_elapsed_ms: number): void => {
    let depletion = (
      MAX_FIRE_STRENGTH
      * FIRE_DEPLETION_FRAC_PER_SECOND
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
}

export {Fire};