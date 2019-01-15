import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Playground from "./containers/Playground/Playground";
import Landing from "./components/Landing/Landing";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endPoint: "http://localhost:5000",
      plUsername: "",
      opUsername: "",
      room: "",
      start: false,
      error: false,
      errorMessage: "",
      plPokemon: "",
      opPokemon: "",
      resultMessage: "",
      plStats: {},
      canAttack: false
    };
    this.socket = socketIOClient(this.state.endPoint);
  }

  componentDidMount() {
    this.socket.on("connect", () => {
      console.log("Connected to the server");
    });
    this.socket.on("disconnect", () => {
      console.log("Connection to the server lost!");
    });
    this.socket.on("opponentJoined", playerList => {
      const opponent = playerList.filter(
        user => user.username !== this.state.plUsername
      )[0];
      const player = playerList.filter(
        user => user.username === this.state.plUsername
      )[0];
      const plStats = {
        attack: player.Attack,
        defence: player.Defence,
        speed: player.Speed,
        sp_attack: player.Sp_Attack,
        sp_defence: player.Sp_Defence
      };
      this.setState({
        opUsername: opponent.username,
        opPokemon: opponent.pokemon,
        plStats,
        canAttack: player.canAttack
      });
    });
    this.socket.on("opponentLeft", () => {
      this.setState({
        start: false,
        resultMessage: "You won! opponent left the match"
      });
    });
    this.socket.on("exception", errorMessage => {
      this.setState({
        error: true,
        errorMessage
      });
    });
  }
  handleUsername = event => {
    this.setState({
      plUsername: String(event.target.value)
    });
  };
  handleRoom = event => {
    this.setState({
      room: String(event.target.value)
    });
  };
  handlePokemon = event => {
    this.setState({
      plPokemon: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    // Can be improved?
    fetch(`/pokemons/${this.state.plPokemon}`)
      .then(res => res.json())
      .then(pokemonObj => {
        this.socket.emit("join", {
          username: this.state.plUsername,
          room: this.state.room,
          pokemon: this.state.plPokemon,
          pokemonHP: pokemonObj.base.HP,
          attack: pokemonObj.base.Attack,
          defence: pokemonObj.base.Defence,
          speed: pokemonObj.base.Speed,
          sp_attack: pokemonObj.base.Sp_Attack,
          sp_defence: pokemonObj.base.Sp_Defence
        });
        this.setState({
          start: true
        });
      });
  };
  render() {
    let content = (
      <Landing
        handleSubmit={this.handleSubmit}
        handleUsername={this.handleUsername}
        handleRoom={this.handleRoom}
        handlePokemon={this.handlePokemon}
      />
    );
    if (this.state.error) {
      content = <p>{this.state.errorMessage}</p>;
    } else if (this.state.start && this.state.opUsername) {
      content = (
        <Playground
          plUsername={this.state.plUsername}
          opUsername={this.state.opUsername}
          plPokemon={this.state.plPokemon}
          opPokemon={this.state.opPokemon}
          plStats={this.state.plStats}
          socket={this.socket}
          canAttack={this.state.canAttack}
        />
      );
    } else if (this.state.start && !this.state.opUsername) {
      content = <p>Waiting for a player to join the match</p>;
    } else if (!this.state.start && this.state.resultMessage) {
      content = <p>{this.state.resultMessage}</p>;
    }
    return content;
  }
}

export default App;
