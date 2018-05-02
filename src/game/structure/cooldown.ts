class Cooldown {

  duration_ms: number;
  time_left_ms: number;

  constructor(duration_ms: number) {
    this.duration_ms = duration_ms;
    this.time_left_ms = 0;
  }

  begin = (): void => {
    this.time_left_ms = this.duration_ms;
  }

  // Whether the cooldown is running.
  isActive = (): boolean => {
    return this.time_left_ms > 0;
  }

  fractionLeft = (): number => {
    return this.time_left_ms / this.duration_ms;
  }

  update = (elapsed_ms: number): void => {
    if (!this.isActive()) {
      return;
    }

    this.time_left_ms -= elapsed_ms;
    if (this.time_left_ms < 0) {
      this.time_left_ms = 0;
    }
  }

}

export {Cooldown};