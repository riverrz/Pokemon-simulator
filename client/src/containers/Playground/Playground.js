import React, { Component, Fragment } from "react";
import "./Playground.css";
import Opponent from "../Opponent/Opponent";
import Player from "../Player/Player";

class Playground extends Component {
  state = {
    plPokemonObj: {},
    opPokemonObj: {}
  };
  componentDidMount() {
    fetch(`/pokemons/${this.props.plPokemon}`)
      .then(res => res.json())
      .then(plPokemonObj => {
        fetch(`/pokemons/${this.props.opPokemon}`)
          .then(res => res.json())
          .then(opPokemonObj => {
            this.setState({
              plPokemonObj,
              opPokemonObj
            });
          });
      });
  }
  render() {
    return (
      <Fragment>
        <div className="game">
          <Opponent
            username={this.props.opUsername}
            pokemon={this.state.opPokemonObj}
          />
          <Player
            username={this.props.plUsername}
            pokemon={this.state.plPokemonObj}
          />
        </div>
        <div className="box">
          <div id="message" className="message">
            What should {this.props.plPokemon.toUpperCase()} do?
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
