type milestone = string;

class MilestoneHistory {

  constructor(
    public milestones: Set<milestone> = new Set()) {}

  setMilestoneReached = (name: milestone) => {
    this.milestones.add(name);
  }

  didReachMilestone = (name: milestone): boolean => {
    return this.milestones.has(name);
  }

}

export {MilestoneHistory};