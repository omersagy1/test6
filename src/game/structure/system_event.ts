enum SystemEventType {
  FIRE_STOKED,
  RESOURCE_HARVESTED
};

class SystemEvent {
  constructor(public type: SystemEventType) {}
};

class SystemEventHistory {

  history: SystemEvent[];

  constructor() {
    this.history = [];
  }

  addEvent = (e: SystemEventType): void => {
    this.history.push(new SystemEvent(e));
  }

  hasEventType = (t: SystemEventType): boolean => {
    return !!(this.history.find((e) => e.type == t));
  }

  clear() {
    this.history = [];
  }

};

export {SystemEventHistory, SystemEventType};