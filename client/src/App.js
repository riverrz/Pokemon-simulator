import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Playground from "./containers/Playground/Playground";
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
      errorMessage: ""
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
      this.setState({
        opUsername: data.filter(
          user => user.username !== this.state.plUsername
        )[0].username
      });
    });
    this.socket.on("opponentLeft", () => {
      console.log("Opponent left, u won!!");
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
  handleSubmit = event => {
    event.preventDefault();
    this.socket.emit("join", {
      username: this.state.plUsername,
      room: this.state.room
    });
    this.setState({
      start: true
    });
  };
  render() {
    let content = (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={this.handleUsername}
            required
          />
          <input
            type="text"
            placeholder="Room Name"
            onChange={this.handleRoom}
            required
          />
          <button>Submit</button>
        </form>
      </div>
    );
    if (this.state.error) {
      content = <p>{this.state.errorMessage}</p>;
    } else if (this.state.start && this.state.opUsername) {
      content = (
        <Playground
          plUsername={this.state.plUsername}
          opUsername={this.state.opUsername}
          socket={this.socket}
        />
      );
    } else if (this.state.start && !this.state.opUsername) {
      content = <p>Waiting for a player to join the match</p>;
    }
    return content;
  }
}

export default App;
