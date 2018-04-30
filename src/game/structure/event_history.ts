import {Event} from './event';

class EventHistory {

  constructor(
    public entries: Entry[] = []) {
  }

  addEntry(event: Event, timestamp: number) {
    this.entries.push(
      new Entry(event, timestamp));
  }

}

class Entry {

  constructor(
    public event: Event,
    public timestamp: number) {
  }

}

export {EventHistory};