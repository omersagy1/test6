class TimedQueue<T> {

  private default_interval: number;
  private queue: T[];
  private curr_time: number;

  constructor(default_interval_ms: number) {
    this.default_interval = default_interval_ms;
    this.queue = [];
    this.curr_time = 0;
  }

  incrementTime = (time_ms: number): void => {
    this.curr_time += time_ms;
  }

  readyToDequeue = (): boolean => {
    return (this.queue.length > 0
            && this.curr_time >= this.default_interval);
  }

  dequeue = (): T => {
    this.curr_time = 0;
    let rtn = this.queue.shift();
    if (!rtn) {
      throw new Error("Not ready to pop.");
    }
    return rtn;
  }

  push = (...items: T[]): void => {
    this.queue.push(...items);
  }

}

export {TimedQueue};