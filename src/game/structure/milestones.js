// TODO: add a milestone. should be abstract
// things that are hard to derive from the
// event or the action history.
const MilestoneType = Object.freeze({

});

class Milestone {

  constructor(type, ...attrs) {
    this.type = type;
    this.attrs = attrs;
  }

}

export {MilestoneType};