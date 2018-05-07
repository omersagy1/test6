enum SystemEventType {
  FIRE_STOKED,
  RESOURCE_GATHERED
};

class SystemEvent {
  constructor(public type: SystemEventType) {}
};

class SystemEventHistory {

  history: SystemEvent[];

  constructor() {
    this.history = [];
  }

  addEvent(e: SystemEventType) {
    this.history.push(new SystemEvent(e));
  }

  hasEventType(t: SystemEventType) {
    return this.history.find(
      (e) => e.type == t);
  }

};

export {SystemEventHistory, SystemEventType};