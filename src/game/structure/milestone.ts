import {ms} from './time';

class Payload {
  constructor(time_added: ms) {}
}

class MilestoneHistory {

  constructor(
    public milestones: Map<string, Payload> = new Map()) {}

  setMilestoneReached = (name: string): void => {
    this.milestones[name] = new Payload(new Date().getMilliseconds());
  }

  didReachMilestone = (name: string): boolean => {
    return this.milestones.has(name);
  }

  timeSinceMilestone = (name: string): ms => {
    if (!this.didReachMilestone(name)) {
      new Error('attempted to get time since unknown milestone.');
    }
    return new Date().getMilliseconds() - this.milestones[name];
  }

}

export {MilestoneHistory};