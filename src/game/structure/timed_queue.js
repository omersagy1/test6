class TimedQueue {

  constructor(default_interval_ms) {
    this.default_interval = default_interval_ms;
    this.queue = [];
    this.curr_time = 0;
  }

  incrementTime = (time_ms) => {
    this.curr_time += time_ms;
  }

  readyToPop = () => {
    return (this.queue.length > 0
            && this.curr_time >= this.default_interval);
  }

  pop = () => {
    this.curr_time = 0;
    return this.queue.pop();
  }

  push = (x, ...rest) => {
    this.queue.push(x, ...rest);
  }

}

export {TimedQueue};