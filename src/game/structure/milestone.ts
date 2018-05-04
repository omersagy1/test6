import {ms} from './time';

class Payload {
  constructor(public time_added: ms) {}
}

class MilestoneHistory {

  constructor(
    public milestones: Map<string, Payload> = new Map()) {}

  setMilestoneReached = (name: string): void => {
    this.milestones.set(name, new Payload(new Date().getTime()));
    console.log(this.milestones);
  }

  didReachMilestone = (name: string): boolean => {
    return this.milestones.has(name);
  }

  timeSinceMilestone = (name: string): ms => {
    if (!this.didReachMilestone(name)) {
      throw new Error('attempted to get time since unknown milestone.');
    }
    let payload = this.milestones.get(name);
    if (!payload) {
      throw new Error('milestone had no associated payload.');
    }
    return new Date().getTime() - payload.time_added;
  }

}

export {MilestoneHistory};