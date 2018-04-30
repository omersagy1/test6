export const ActionType = Object.freeze({
    STOKE_FIRE:   Symbol("stoke-fire"),
    SELECT_CHOICE:  Symbol("select-choice")
});

export const stokeCallback = (game) => () => {
    game.queueInput({
        type: ActionType.STOKE_FIRE
    });
  };

export const selectChoiceCallback = (game) => (choice_text) => {
  game.queueInput({
    type: ActionType.SELECT_CHOICE,
    text: choice_text
  });
}
