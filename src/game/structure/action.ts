import {Game} from './game';

export type Action = GenericAction | SelectChoice;

export enum ActionType {
    STOKE_FIRE,
    SELECT_CHOICE
}

export interface GenericAction {
  type: ActionType;
}

export interface SelectChoice extends GenericAction {
  text: string;
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
