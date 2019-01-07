import React, { Component, Fragment } from "react";
import "./Playground.css";
import Opponent from "../Opponent/Opponent";
import Player from "../Player/Player";

class Playground extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <div className="game">
          <Opponent username={this.props.opUsername} />
          <Player username={this.props.plUsername} />
        </div>
        <div className="box">
          <div id="message" className="message">
            What should Blastoise do?
          </div>
          <div className="actions">
            <button>Water Cannon</button>
            <button>Water Pulse</button>
            <button>Surf</button>
            <button>Tackle</button>
          </div>
          <div className="continue">
            <button>Continue</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Playground;
