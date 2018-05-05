import {State} from './state';


class StoryEvent {

  constructor(public id?: string,
              public text: string[] = [],
              public trigger: (_:State) => boolean = (_) => false,
              public choices: Choice[] = [],
              public effect: (_:State) => void = (_) => {},
              public recurring = false) {

    if (!id) {
      this.id = StoryEventIdGen();
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
    public consequence: StoryEvent) {
  }

}

const StoryEventIdGen: () => string
 = (() => {
  let next_id = 0;
  return () => {
    next_id += 1;
    return String(next_id);
  }
})();

export {StoryEvent, Choice};