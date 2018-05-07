type Brand<base, brand> = base & { _brand?: brand };

export type ms = Brand<number, 'ms'>;
export type secs = Brand<number, 'secs'>;
export type mins = Brand<number, 'mins'>;
export type hrs = Brand<number, 'hrs'>;

export const millis = (
  s: secs = 0,
  m: mins = 0,
  h: hrs = 0): ms => {

  return 1000 * (s + 60 * (m + 60 * h));
}

export class Clock {

  start_time?: ms;
  game_time: ms;

  constructor() {
    this.game_time = 0;
  }

  start = (start_time: ms): void => {
    this.start_time = start_time;
  }

  update = (time: ms): void => {
    this.game_time += time;
  }

  gameTimeElapsed = (): ms => {
    return this.game_time;
  }

  gameTimeElapsedSeconds = (): secs => {
    return this.gameTimeElapsed() / 1000;
  }

  realTimeElapsed = (): ms => {
    if (!this.start_time) {
      throw new Error(
        'The clock must be started before getting the real time.');
    }
    return new Date().getTime() - this.start_time;
  }

}