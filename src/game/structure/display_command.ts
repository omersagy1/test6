type DisplayCommand = DisplayText
                      | DisplayChoice;

enum DisplayCommandType {
  TEXT,
  CHOICE
}

interface DisplayText {
  type: DisplayCommandType.TEXT;
  text_line: string;
}

interface DisplayChoice {
  type: DisplayCommandType.CHOICE;
  choices: string[];
}

const makeDisplayTextCommand = (line: string): DisplayText => {
  return {
    type: DisplayCommandType.TEXT,
    text_line: line
  };
};

const makeDisplayChoiceCommand = (choices: string[]): DisplayChoice => {
  return {
    type: DisplayCommandType.CHOICE,
    choices: choices
  };
};
