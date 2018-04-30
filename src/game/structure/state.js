import {Fire} from './fire';
import {ActionType} from './action';
import {MilestoneType} from './milestones';

import {getAllEvents} from './event_templates';
import {TimedQueue} from './timed_queue';

const DISPLAY_MESSAGE_DELAY_MS = 1000;

class State {

  constructor() {
    this.possible_events = getAllEvents();
    this.start_time_ms = null;

    this.event_history = [];
    this.action_history = [];
    this.resources = [];
    this.milestones = new Set();

    this.active_choice = null;

    this.display_message_queue = new TimedQueue(
      DISPLAY_MESSAGE_DELAY_MS);
    this.display_message_history = [];

    this.fire = new Fire();
  }

  start = (start_time_ms) => {
    this.start_time_ms = start_time_ms;
  }

  timeElapsedSeconds = () => {
    let rtn = (new Date().getTime() - this.start_time_ms) / 1000;
    return rtn;
  }

  update = (time_elapsed_ms) => {
    this.fire.update(time_elapsed_ms);
    this.checkEventTriggers();
    this.processDisplayMessages(time_elapsed_ms);
  }

  processDisplayMessages = (time_elapsed_ms) => {
    this.display_message_queue.incrementTime(time_elapsed_ms);
    if (this.display_message_queue.readyToPop()) {
      this.display_message_history.push(
        this.display_message_queue.pop());
    }
  }

  processAction = (action) => {
    if (action.type === ActionType.STOKE_FIRE) {
      this.fire.stoke();
    } else if (action.type === ActionType.SELECT_CHOICE) {
      this.makeChoice(action.text);
    }
    this.action_history.push(action);
  }

  checkEventTriggers = () => {
    let events_run = [];
    for (let e of this.possible_events) {
      if (e.trigger(this)) {
        this.runEvent(e);
        events_run.push(e);
      }
    }
    // Assumes that events can only run once.
    this.possible_events = (
      this.possible_events.filter((e) => {
        return !events_run.includes(e);
    }));
  }

  runEvent = (event) => {
    this.display_message_queue.push(...event.text)

    if (event.hasChoices()) {
      this.choiceRequired(event);
    }

    event.execute(this);

    this.event_history.push(event);
  }

  choiceRequired = (event) => {
    this.active_event = event;
  }

  isWaitingForChoice = () => {
    return !!this.active_event;
  }

  makeChoice = (choice_text) => {
    for (let choice of this.active_event.choices) {
      if (choice.text === choice_text) {
        this.runEvent(choice.consequence);
      }
    }
    this.active_event = null;
  }

  didReachMilestone = (milestone) => {
    return this.milestones.has(milestone);
  }

  actionPerformed = (action_type) => {
    let types = this.action_history.map((a) => a.type);
    return types.includes(action_type);
  }

  getMessageHistory = () => {
    return this.display_message_history.slice();
  }

}

export {State};
