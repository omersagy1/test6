import {ms} from './time';

class TimedQueue<T> {

  private default_interval: number;
  private queue: T[];
  private curr_time: number;

  constructor(default_interval: ms) {
    this.default_interval = default_interval;
    this.queue = [];
    this.curr_time = 0;
  }

  incrementTime = (time: ms): void => {
    this.curr_time += time;
  }

  readyToDequeue = (): boolean => {
    return (this.queue.length > 0
            && this.curr_time >= this.default_interval);
  }

  dequeue = (): T => {
    if (!this.readyToDequeue()) {
      throw new Error("Not ready to dequeue.");
    }
    this.curr_time = 0;
    let rtn = this.queue.shift();
    if (!rtn) {
      throw new Error("Dequeuing failed.");
    }
    return rtn;
  }

  enqueue = (...items: T[]): void => {
    this.queue.push(...items);
  }

}

export {TimedQueue};