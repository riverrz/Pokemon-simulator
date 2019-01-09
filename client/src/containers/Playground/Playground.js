import React, { Component, Fragment } from "react";
import "./Playground.css";
import Opponent from "../Opponent/Opponent";
import Player from "../Player/Player";
import AttackControl from "../../components/AttackControl/AttackControl";

class Playground extends Component {
  state = {
    plPokemonObj: {},
    opPokemonObj: {},
    moves: []
  };
  componentDidMount() {
    fetch(`/pokemons/${this.props.plPokemon}`)
      .then(res => res.json())
      .then(plPokemonObj => {
        const promiseArr = plPokemonObj.moves.map(id => {
          return fetch(`/moves/${id}`).then(res => res.json());
        });
        Promise.all(promiseArr)
          .then(moves => {
            this.setState({
              moves
            });
          })
          .catch(console.log);
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
          <AttackControl moves={this.state.moves} />
          <div className="continue">
            <button>Continue</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Playground;
