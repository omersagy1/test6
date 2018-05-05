import {StoryEvent} from './event';

class StoryEventHistory {

  constructor(
    public entries: Entry[] = []) {
  }

  addEntry(event: StoryEvent, timestamp: number) {
    this.entries.push(
      new Entry(event, timestamp));
  }

}

class Entry {

  constructor(
    public event: StoryEvent,
    public timestamp: number) {
  }

}

export {StoryEventHistory};