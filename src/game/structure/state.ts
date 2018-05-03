import {Fire} from './fire';
import {Action, SelectChoice, ActionType} from './action';
import {Cooldown} from './cooldown';
import {Resource, Harvester} from './resource';

import {Event} from './event';
import {getAllEvents} from './event_templates';
import {TimedQueue} from './timed_queue';

import {ms, secs, mins, millis} from './time';

import * as config from './config';


class State {

  start_time: ms;

  action_history: Action[];
  actions_performed_current_cycle: Action[];
  action_cooldowns: Map<ActionType, Cooldown>;

  possible_events: Event[];
  event_history: Event[];
  active_event: Event | null;

  display_message_queue: TimedQueue<string>;
  display_message_history: string[];

  fire: Fire;
  resources: Resource[];
  harvesters: Harvester[];

  constructor() {
    this.possible_events = getAllEvents();
    this.start_time = 0;

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
    this.resources = [
      new Resource('Water'),
      new Resource('Wood'),
      new Resource('Gold')
    ];
    this.harvesters = [
      new Harvester(this.resources[0], 10, millis(30 as secs)),
      new Harvester(this.resources[1], 100, millis(20 as secs)),
      new Harvester(this.resources[2], 1, millis(0, 2 as mins))
    ];
  }

  start = (start_time: ms): void => {
    this.start_time = start_time;
  }

  timeElapsed = (): secs => {
    let rtn = (new Date().getTime() - this.start_time) / 1000;
    return rtn;
  }

  update = (time_elapsed: ms): void => {
    this.fire.update(time_elapsed);
    this.checkEventTriggers();
    this.processDisplayMessages(time_elapsed);
    this.clearActionsCurrentCycle();
  }

  processDisplayMessages = (time_elapsed: ms): void => {
    this.display_message_queue.incrementTime(time_elapsed);
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

  actionEverPerformed = (action_type: ActionType): boolean => {
    let types = this.action_history.map(
      (a) => a.type);
    return types.includes(action_type);
  }

  getMessageHistory = (): string[] => {
    return this.display_message_history.slice();
  }

}

export {State};
