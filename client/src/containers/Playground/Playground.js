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
    this.props.socket.on("opponentHPUpdate", ({ newHP }) => {
      const newopPokemonObj = { ...this.state.opPokemonObj };
      const newBase = { ...newopPokemonObj.base };
      newBase.HP = Number(newHP);
      newopPokemonObj.base = newBase;
      this.setState({
        opPokemonObj: newopPokemonObj
      });
    });
    this.props.socket.on("playerHPUpdate", ({ newHP }) => {
      const newplPokemonObj = { ...this.state.plPokemonObj };
      const newBase = { ...newplPokemonObj.base };
      newBase.HP = Number(newHP);
      newplPokemonObj.base = newBase;
      this.setState({
        plPokemonObj: newplPokemonObj
      });
    });
  }
  handleAttack = moveName => {
    // emit attack event with opponent HP, target pokemon, player pokemon, move name
    this.props.socket.emit("attack", {
      hp: this.state.opPokemonObj.base.HP,
      targetName: this.state.opPokemonObj.name,
      attackerName: this.state.plPokemonObj.name,
      attackName: moveName
    });
  };
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
            stats = {this.props.plStats}
          />
        </div>
        <div className="box">
          <div id="message" className="message">
            What should {this.props.plPokemon.toUpperCase()} do?
          </div>
          <AttackControl
            moves={this.state.moves}
            handleAttack={this.handleAttack}
          />
          <div className="continue">
            <button>Continue</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Playground;
