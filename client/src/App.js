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
      resultMessage: ""
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
    this.socket.on("opponentJoined", data => {
      const opponent = data.filter(
        user => user.username !== this.state.plUsername
      )[0];
      console.log(opponent);

      this.setState({
        opUsername: opponent.username,
        opPokemon: opponent.pokemon
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
    this.socket.emit("join", {
      username: this.state.plUsername,
      room: this.state.room,
      pokemon: this.state.plPokemon
    });
    this.setState({
      start: true
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
          socket={this.socket}
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
