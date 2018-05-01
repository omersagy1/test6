import {State} from './state';


class Event {

  constructor(public id?: string,
              public text: string[] = [],
              public trigger: (_:State) => boolean = (_) => false,
              public choices: Choice[] = [],
              public effect: (_:State) => void = (_) => {}) {

    if (!id) {
      this.id = EventIdGen();
    }
  }

  hasChoices = (): boolean => {
    return this.choices.length > 0;
  }

  getDisplayMessages = (): string[] => {
    return this.text.slice();
  }

  execute = (state: State): void => {
    this.effect(state);
  }

}

class Choice {

  constructor(
    public text: string, 
    public consequence: Event) {
  }

}

const EventIdGen = (() => {
  let next_id = 0;
  return () => {
    next_id += 1;
    return String(next_id);
  }
})();

export {Event, Choice};