import {Fire} from './fire';
import {Action, SelectChoice, ActionType} from './action';
import {Cooldown} from './cooldown';

import {Event} from './event';
import {getAllEvents} from './event_templates';
import {TimedQueue} from './timed_queue';

import * as config from './config';


class State {

  start_time_ms: number;

  action_history: Action[];
  actions_performed_current_cycle: Action[];
  action_cooldowns: Map<ActionType, Cooldown>;

  possible_events: Event[];
  event_history: Event[];
  active_event: Event | null;

  display_message_queue: TimedQueue<string>;
  display_message_history: string[];

  fire: Fire;

  constructor() {
    this.possible_events = getAllEvents();
    this.start_time_ms = 0;

    this.event_history = [];
    this.active_event = null;

    this.action_history = [];
    this.actions_performed_current_cycle = [];
    this.action_cooldowns = new Map([
      [ActionType.STOKE_FIRE, new Cooldown(5000)]
    ]);

    this.display_message_queue = new TimedQueue(
      config.DISPLAY_MESSAGE_DELAY_MS);
    this.display_message_history = [];

    this.fire = new Fire();
  }

  start = (start_time_ms: number): void => {
    this.start_time_ms = start_time_ms;
  }

  timeElapsedSeconds = (): number => {
    let rtn = (new Date().getTime() - this.start_time_ms) / 1000;
    return rtn;
  }

  update = (time_elapsed_ms: number): void => {
    this.fire.update(time_elapsed_ms);
    this.checkEventTriggers();
    this.processDisplayMessages(time_elapsed_ms);
    this.clearActionsCurrentCycle();
  }

  processDisplayMessages = (time_elapsed_ms: number): void => {
    this.display_message_queue.incrementTime(time_elapsed_ms);
    if (this.display_message_queue.readyToDequeue()) {
      this.display_message_history.push(
        this.display_message_queue.dequeue());
    }
  }

  processAction = (action: Action): void => {
    if (action.type === ActionType.STOKE_FIRE) {
      this.fire.stoke();
    } else if (action.type === ActionType.SELECT_CHOICE) {
      this.makeChoice((action as SelectChoice).text);
    }
    this.actions_performed_current_cycle.push(action);
    this.action_history.push(action);
  }

  clearActionsCurrentCycle = (): void => {
    this.actions_performed_current_cycle = [];
  }

  checkEventTriggers = (): void => {
    let events_run: Event[] = [];
    for (let e of this.possible_events) {
      if (e.trigger(this)) {
        this.runEvent(e);
        events_run.push(e);
      }
    }
    // Assumes that events can only run once.
    this.possible_events = (
      this.possible_events.filter((e) => {
        return e.recurring || !events_run.includes(e);
    }));
  }

  runEvent = (event: Event): void => {
    this.display_message_queue.push(...event.text)

    if (event.hasChoices()) {
      this.choiceRequired(event);
    }

    event.execute(this);

    this.event_history.push(event);
  }

  choiceRequired = (event: Event): void => {
    this.active_event = event;
  }

  isWaitingForChoice = (): boolean => {
    return !!this.active_event;
  }

  makeChoice = (choice_text: string): void => {
    if (!this.active_event) {
      return;
    }
    for (let choice of this.active_event.choices) {
      if (choice.text === choice_text) {
        this.runEvent(choice.consequence);
      }
    }
    this.active_event = null;
  }

  actionPerformed = (action_type: ActionType): boolean => {
    let types = this.actions_performed_current_cycle.map(
      (a) => a.type);
    return types.includes(action_type);
  }

  getMessageHistory = (): string[] => {
    return this.display_message_history.slice();
  }

}

export {State};
