import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Playground from "./containers/Playground/Playground";
import Landing from "./components/Landing/Landing";
import BodyMovin from "./components/BodyMovin/BodyMovin";
import WorldAnimation from "./assets/Animations/world_locations.json";
import LooserAnimation from "./assets/Animations/looser.json";
import WinnerAnimation from "./assets/Animations/winner.json";
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
      winner: "",
      resultMessage: "",
      plStats: {},
      canAttack: false
    };
    this.socket = socketIOClient(this.state.endPoint);
  }

  componentDidMount() {
    // Connection Event
    this.socket.on("connect", () => {
      console.log("Connected to the server");
    });

    // Disconnection Event
    this.socket.on("disconnect", () => {
      console.log("Connection to the server lost!");
    });

    // Opponent Joined Event
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

    // Opponent Left Event
    this.socket.on("opponentLeft", () => {
      if (this.state.start) {
        this.setState({
          start: false,
          resultMessage: "You won! opponent left the match",
          winner: this.state.plUsername
        });
      }
    });

    // canAttackChanged Event
    this.socket.on("canAttackChanged", canAttack => {
      this.setState({
        canAttack
      });
    });

    // Gameover event
    this.socket.on("gameover", winner => {
      let resultMessage;
      if (this.state.plUsername === winner) {
        resultMessage = "Game Over! You won the match";
      } else if (this.state.opUsername === winner) {
        resultMessage = "Game Over! Sorry you lost the match";
      } else {
        return this.setState({
          error: true,
          errorMessage: "Some error occurred in determining the winner"
        });
      }
      this.setState({
        start: false,
        resultMessage,
        winner
      });
    });

    // Exception Occurred Event
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
      content = (
        <div className="App__container" style={{width:"40%"}}>
          <div className="App__message">Waiting for opponent to join....</div>
          <BodyMovin animationData={WorldAnimation}/>
        </div>
      );
    } else if (!this.state.start && this.state.resultMessage) {
      if (this.state.winner === this.state.plUsername) {
        content = (
          <div className="App__container">
            <div className="App__message">{this.state.resultMessage}</div>
            <BodyMovin
              animationData={WinnerAnimation}
              style={{ width: "100%" }}
            />
          </div>
        );
      } else {
        content = (
          <div className="App__container">
            <div className="App__message">{this.state.resultMessage}</div>
            <BodyMovin
              animationData={LooserAnimation}
              style={{ width: "100%" }}
            />
          </div>
        );
      }
    }
    return content;
  }
}

export default App;
