import {State} from './state';

class Event {

  constructor(public id: string,
              public text: string[] = [],
              public trigger: (_:State) => boolean = (_) => false,
              public choices: Choice[] = [],
              public effect: (_:State) => void = (_) => {}) {
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

export {Event, Choice};