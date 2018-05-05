import * as t from './triggers';
import * as m from './mutators';
import {State} from './state';
import {StoryEvent, Choice} from './event';
import {secs} from './time';

// StoryEvents have:
// - id
// - text
// - trigger
// - choice[]
// - recurring
const EVENT_TEMPLATES = [

  {
    id: 'fire-warning',
    trigger: t.fireIsLow,
    text: 'Make sure the fire does not go out.'
  },

  {
    id: 'man-enters',
    trigger: t.timePassed(10 as secs),
    text: 'Someone is knocking on the door.',
    choices: [
      {
        text: 'Answer',
        consequence: {
          text: [
            'You see the sallow face of a man.',
            '"Give me your wood or I will put out the fire."'
          ],
          effect: m.noOp,
          choices: [
            {
              text: "Surrender Wood",
              consequence: {
                text: "The man takes your wood and disappears."
              },
              effect: m.dampenResource('Wood', 100)
            },

            {
              text: 'Fight',
              consequence: {
                text: [
                  'You fight and win.',
                  'The fire is waning.'
                ],
                effect: m.and(m.dampenFire(.5),
                              m.setMilestone('thief-killed'))
              }
            }]
        }
      },
      {
        text: 'Ignore',
        consequence: {
          text: [
            'StoryEventually, the knocking stops.',
            'You wonder if such peace can really exist.'
          ],
          effect: m.setMilestone('thief-escapes')
        }
      }]
  },

  {
    trigger: t.timeSinceMilestone('thief-killed', 5 as secs),
    text: 'The man has returned!'
  },

  {
    id: 'dampen-choice',
    trigger: t.timePassed(30 as secs),
    text: 'Dampen the fire?',
    choices: [
      { 
        text: 'Yes', 
        consequence: {
          text: 'fire dampened',
          effect: m.dampenFire(.8)
        }
      },
      {
        text: 'No',
        consequence: {
          text: 'nothing happened',
          effect: m.noOp
        }
      }]
  },

  {
    trigger: t.fireWentOut,
    text: ['The fire is dead.',
           'Watch out.']
  },

  {
    trigger: t.fireStoked,
    text: 'The fire is roaring.',
    recurring: true
  }

];


interface StoryEventTemplate {
  id?: string;
  trigger?: (_:State) => boolean;
  text: string[] | string;
  choices?: ChoiceTemplate[];
  effect?: (_:State) => void;
  recurring?: boolean;
}


interface ChoiceTemplate {
  text: string;
  consequence: StoryEventTemplate;
}


const makeStoryEvent = (template: StoryEventTemplate): StoryEvent => {

  return new StoryEvent(template.id,
                   toArray(template.text),
                   template.trigger,
                   makeChoices(template.choices),
                   template.effect,
                   template.recurring);
}

const makeChoices = (templates?: ChoiceTemplate[]): Choice[] | undefined => {
  let choices;
  if (!!templates) {
    choices = templates.map(makeChoice);
  }
  return choices;
}


const makeChoice = (template: ChoiceTemplate): Choice => {
  return new Choice(template.text, makeStoryEvent(template.consequence));
}

const toArray = <T>(x: T|T[]): T[] => {
  if (Array.isArray(x)) {
    return x;
  } else {
    return [x];
  }
}

const getAllStoryEvents = (): StoryEvent[] => {
  return EVENT_TEMPLATES.map(makeStoryEvent);
}

export {getAllStoryEvents};
