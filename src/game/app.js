import React from 'react';

import {Game} from './structure/game';
import * as action from './structure/action';

import {Firebar, StokeButton} from './render/fire';
import {EventDisplay} from './render/event_display';
import {ChoiceButtonRow} from './render/choice_buttons';
import {Meter} from './render/meter';

import './app.css';

import "./app.css";

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      // Modify the heartbeat to rerender.
      heartbeat: false
    }

    this.game = new Game(this.triggerRender);
  }

  triggerRender = () => {
    this.setState({heartbeat: !this.state.heartbeat});
  }

  componentDidMount() {
    this.game.play();
  }

  render() {
    let s = this.game.state;

    return (
      <div className="display-container">

        <div className="text-display">
          <EventDisplay messages={s.getMessageHistory()} />
        </div>

        <div className="interactive-display">
          <div className="fire-display">
            <Firebar 
              fire_model={s.fire} />
            <Meter proportion={s.fire.strengthProportion()} />
            <StokeButton 
              action_callback={action.stokeCallback(this.game)} />
          </div>
          <ChoiceButtonRow 
            action_callback={action.selectChoiceCallback(this.game)}
            active_event={s.active_event} />
        </div>

      </div>
    )
  }

}

export {App};
