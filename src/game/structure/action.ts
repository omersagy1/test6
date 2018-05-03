import {Game} from './game';

export type Action = GenericAction 
                     | SelectChoice
                     | HarvestResource;

export enum ActionType {
    STOKE_FIRE,
    SELECT_CHOICE,
    HARVEST_RESOURCE
};

export interface GenericAction {
  type: ActionType;
};

export interface SelectChoice extends GenericAction {
  text: string;
};

export interface HarvestResource extends GenericAction {
  name: string;
};

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
};

export const harvestResourceCallback = (game: Game) => (name: string) => {
  game.queueInput({
    type: ActionType.HARVEST_RESOURCE,
    name: name
  });
};


