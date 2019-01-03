import React, { Component, Fragment } from "react";
import "./Playground.css";

class Playground extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <div className="game">
          <div className="opponent">
            <div className="stats">
              <div className="top">
                <div className="pokeballs">
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                </div>
                <div id="apHP" className="hp-count">
                  100
                </div>
              </div>
              <span className="name">Charizard</span>
              <span className="level">86</span>
            </div>
            <img
              className="pokemon"
              src="http://play.pokemonshowdown.com/sprites/xyani/charizard-megax.gif"
              alt="Pokemon"
            />
          </div>
          <div className="player">
            <div className="stats">
              <div className="top">
                <div className="pokeballs">
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                </div>
                <div id="myHP" className="hp-count">
                  100
                </div>
              </div>
              <span className="name">Blastoise</span>
              <span className="level">86</span>
            </div>
            <img
              className="pokemon"
              src="http://play.pokemonshowdown.com/sprites/xyani/blastoise-mega.gif"
              alt="Pokemon"
            />
          </div>
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
