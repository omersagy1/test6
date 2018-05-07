import {Fire} from './fire';
import {Action, SelectChoice, HarvestResource, ActionType} from './action';
import {Cooldown} from './cooldown';
import {Resource, Harvester} from './resource';

import {MilestoneHistory} from './milestone';
import {SystemEventHistory, SystemEventType} from './system_event';

import {StoryEvent} from './event';
import {getAllStoryEvents} from './event_templates';
import {TimedQueue} from './timed_queue';

import {Clock, ms, secs, millis} from './time';

import * as config from './config';

class State {

  clock: Clock;
  paused: boolean;

  action_history: Action[];
  actions_performed_current_cycle: Action[];
  action_cooldowns: Map<ActionType, Cooldown>;

  possible_events: StoryEvent[];
  event_history: StoryEvent[];
  active_event: StoryEvent | null;

  display_message_queue: TimedQueue<string>;
  display_message_history: string[];

  fire: Fire;
  resources: Resource[];
  harvesters: Harvester[];

  milestone_history: MilestoneHistory;
  system_event_history: SystemEventHistory;

  constructor() {
    this.clock = new Clock();
    this.paused = false;

    this.possible_events = getAllStoryEvents();
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

    this.resources = [];
    this.harvesters = [];
    this.addResource('wood', 10, millis(40 as secs));

    this.milestone_history = new MilestoneHistory();
    this.system_event_history = new SystemEventHistory();
  }

  start = (start_time: ms): void => {
    this.clock.start(start_time);
  }

  pause = (): void => {
    this.paused = true;
  }

  resume = (): void => {
    this.paused = false;
  }

  update = (time_elapsed: ms): void => {
    if (this.paused) {
      return;
    }
    this.clock.update(time_elapsed);
    this.fire.update(time_elapsed);
    this.harvesters.map((h) => h.update(time_elapsed));
    this.checkStoryEventTriggers();
    this.processDisplayMessages(time_elapsed);
    this.clearActionsCurrentCycle();
    this.system_event_history.clear();
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
      this.stokeFire();
    } else if (action.type === ActionType.SELECT_CHOICE) {
      this.makeChoice((action as SelectChoice).text);
    } else if (action.type === ActionType.HARVEST_RESOURCE) {
      this.harvestResource((action as HarvestResource).name);
    }
    this.actions_performed_current_cycle.push(action);
    this.action_history.push(action);
  }

  clearActionsCurrentCycle = (): void => {
    this.actions_performed_current_cycle = [];
  }

  checkStoryEventTriggers = (): void => {
    let events_run: StoryEvent[] = [];
    for (let e of this.possible_events) {
      if (e.trigger(this)) {
        this.runStoryEvent(e);
        events_run.push(e);
      }
    }
    // Assumes that events can only run once.
    this.possible_events = (
      this.possible_events.filter((e) => {
        return e.recurring || !events_run.includes(e);
    }));
  }

  runStoryEvent = (event: StoryEvent): void => {
    this.display_message_queue.enqueue(...event.text)
    event.execute(this);
    this.event_history.push(event);
    if (event.hasChoices()) {
      this.choiceRequired(event);
    }
  }

  choiceRequired = (event: StoryEvent): void => {
    this.active_event = event;
  }

  isWaitingForChoice = (): boolean => {
    return !!this.active_event;
  }

  stokeFire = (): void => {
    if (this.fire.canStoke()) {
      this.fire.stoke();
      this.system_event_history.addEvent(
        SystemEventType.FIRE_STOKED);
    }
  }

  makeChoice = (choice_text: string): void => {
    if (!this.active_event) {
      return;
    }
    let choices = this.active_event.choices;
    this.active_event = null;

    for (let choice of choices) {
      if (choice.text === choice_text) {
        this.runStoryEvent(choice.consequence);
      }
    }
  }

  addResource(name: string, harvest_size: number, cooldown: ms) {
    let r = new Resource(name);
    let h = new Harvester(r, harvest_size, cooldown);
    h.beginCooldown();

    this.resources.push(r);
    this.harvesters.push(h);
  }

  harvestResource = (name: string): void => {
    let harvesters = this.harvesters.filter(
      (h) => h.resource.name === name
    );

    let harvester = harvesters[0];

    if (harvester.canHarvest()) {
      harvester.harvest();
      this.system_event_history.addEvent(
        SystemEventType.RESOURCE_HARVESTED);
    }
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

  getResource = (name: string): Resource => {
    let resource = this.resources.find(
      (r) => r.name === name);
    if (!resource) {
      throw Error('Resource could not be found.');
    }
    return resource;
  }

}

export {State};
