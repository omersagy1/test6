import {State} from './state';
import {Action} from './action';

const FRAME_LENGTH_MS = 1000 / 20;

class Game {

  state: State;
  input_queue: Action[];
  render: () => void;

  last_time: number;
  ticker_id: number;

  constructor(render_callback: () => void) {
    this.state = new State();
    this.input_queue = [];
    this.render = render_callback;

    this.last_time = 0;
    this.ticker_id = 0;
  }

  // Initiates the game loop.
  play = (): void => {
    const start_time = new Date().getTime();
    this.state.start(start_time);
    this.last_time = start_time;
    this.ticker_id = window.setInterval(this.loop, FRAME_LENGTH_MS);
  }

  // Should not be called directly. Call play() instead.
  loop = (): void => {
    let current_time = new Date().getTime();
    let time_elapsed_ms = current_time - this.last_time;
    this.last_time = current_time;

    this.updateState(time_elapsed_ms);
    this.processInput();
    this.render();
  }

  // Stops the game, but does not clear the state.
  pause = (): void => {
    window.clearInterval(this.ticker_id);
  }

  updateState = (time_elapsed_ms: number): void => {
    this.state.update(time_elapsed_ms); 
  }

  queueInput = (action: Action): void => {
    this.input_queue.push(action);
  }

  clearInputQueue = (): void => {
    this.input_queue = [];
  }

  processInput = (): void => {
    for (let a of this.input_queue) {
      this.state.processAction(a);        
    }
    this.clearInputQueue();
  }

}

export {Game};