import * as t from './triggers';
import * as mutators from './mutators';
import {State} from './state';
import {Event, Choice} from './event';
import {secs} from './time';


// Events have:
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
          effect: mutators.noOp,
          choices: [
            {
              text: "Surrender Wood",
              consequence: {
                text: "The man takes your wood and disappears."
              },
              effect: mutators.dampenResource('Wood', 100)
            },

            {
              text: "Fight",
              consequence: {
                text: "You fight and win.",
                effect: mutators.noOp
              }
            }]
        }
      },
      {
        text: 'Ignore',
        consequence: {
          text: [
            'Eventually, the knocking stops.',
            'You wonder if such peace can really exist.'
          ],
          effect: mutators.noOp
        }
      }]
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
          effect: mutators.dampenFire(.8)
        }
      },
      {
        text: 'No',
        consequence: {
          text: 'nothing happened',
          effect: mutators.noOp
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


interface EventTemplate {
  id?: string;
  trigger?: (_:State) => boolean;
  text: string[] | string;
  choices?: ChoiceTemplate[];
  effect?: (_:State) => void;
  recurring?: boolean;
}


interface ChoiceTemplate {
  text: string;
  consequence: EventTemplate;
}


const makeEvent = (template: EventTemplate): Event => {

  return new Event(template.id,
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
  return new Choice(template.text, makeEvent(template.consequence));
}

const toArray = <T>(x: T|T[]): T[] => {
  if (Array.isArray(x)) {
    return x;
  } else {
    return [x];
  }
}

const getAllEvents = (): Event[] => {
  return EVENT_TEMPLATES.map(makeEvent);
}

export {getAllEvents};
