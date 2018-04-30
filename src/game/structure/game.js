import {State} from './state';

const FRAME_LENGTH_MS = 1000 / 20;

class Game {

  constructor(render_callback) {
    this.state = new State();
    this.input_queue = [];
    this.render = render_callback;
  }

  // Initiates the game loop.
  play = () => {
    const start_time = new Date().getTime();
    this.state.start(start_time);
    this.last_time = start_time;
    this.ticker = setInterval(this.loop, FRAME_LENGTH_MS);
  }

  // Should not be called directly. Call play() instead.
  loop = () => {
    let current_time = new Date().getTime();
    let time_elapsed_ms = current_time - this.last_time;
    this.last_time = current_time;

    this.updateState(time_elapsed_ms);
    this.processInput();
    this.render();
  }

  // Stops the game, but does not clear the state.
  pause = () => {
    clearInterval(this.ticker);
  }

  updateState = (time_elapsed_ms) => {
    this.state.update(time_elapsed_ms); 
  }

  queueInput = (action) => {
    this.input_queue.push(action);
  }

  clearInputQueue = () => {
    this.input_queue = [];
  }

  processInput = () => {
    for (let a of this.input_queue) {
      this.state.processAction(a);        
    }
    this.clearInputQueue();
  }

}

export {Game};