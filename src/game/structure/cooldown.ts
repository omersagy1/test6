import {ms} from './time';

class Cooldown {

  duration: ms;
  time_left: ms;

  constructor(duration: ms) {
    this.duration = duration;
    this.time_left = 0;
  }

  begin = (): void => {
    this.time_left = this.duration;
  }

  // Whether the cooldown is running.
  isActive = (): boolean => {
    return this.time_left > 0;
  }

  fractionLeft = (): number => {
    return this.time_left / this.duration;
  }

  update = (elapsed: ms): void => {
    if (!this.isActive()) {
      return;
    }

    this.time_left -= elapsed;
    if (this.time_left < 0) {
      this.time_left = 0;
    }
  }

}

export {Cooldown};