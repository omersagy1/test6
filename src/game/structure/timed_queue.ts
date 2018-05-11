import {ms} from './time';

class TimedQueue<T> {

  private default_delay: number;
  private queue: TimedNode<T>[];
  private curr_time: number;

  constructor(default_delay: ms) {
    this.default_delay = default_delay;
    this.queue = [];
    this.curr_time = 0;
  }

  incrementTime = (time: ms): void => {
    this.curr_time += time;
  }

  readyToDequeue = (): boolean => {
    return (this.queue.length > 0
            && this.curr_time >= this.queue[0].delay);
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
    return rtn.value;
  }

  enqueue = (...items: T[]): void => {
    let nodes: TimedNode<T>[] = items.map(
      (i) => { 
        return { value: i, delay: this.default_delay }
      }
    )
    this.queue.push(...nodes);
  }

  enqueueCustomDelays = (...nodes: TimedNode<T>[]): void => {
    this.queue.push(...nodes)
  }

}

interface TimedNode<T> {
  value: T;
  delay: ms;
};

export {TimedQueue};