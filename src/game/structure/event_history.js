class EventHistory {

  constructor() {
    this.entries = [];
  }

  addEntry(event, timestamp) {
    this.entries.push(
      new HistoryEntry(event, timestamp));
  }

}

class Entry {

  constructor(event, timestamp) {
    this.event = event;
    this.timestamp = timestamp;
  }

}

export {EventHistory};