class Cooldown {

  constructor(
    public duration_ms: number,
    public time_left_ms: number = 0) {
  }

  begin = (): void => {
    this.time_left_ms = this.duration_ms;
  }

  // Whether the cooldown is running.
  isActive = (): boolean => {
    return this.time_left_ms > 0;
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