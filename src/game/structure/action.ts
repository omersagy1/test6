import {Game} from './game';

export enum ActionType {
    STOKE_FIRE,
    SELECT_CHOICE
}

export interface Action {
  t: ActionType
}

export const stokeCallback = (game: Game) => () => {
    game.queueInput({
        type: ActionType.STOKE_FIRE
    });
  };

export const selectChoiceCallback = (game: Game) => (choice_text: string) => {
  game.queueInput({
    type: ActionType.SELECT_CHOICE,
    text: choice_text
  });
}
