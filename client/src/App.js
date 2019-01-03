import React, { Component } from "react";
// import socketIOClient from "socket.io-client";
import Playground from "./containers/Playground/Playground";
import "./App.css";

class App extends Component {
  state = {
    endPoint: "http://localhost:5000",
    plUsername: "", // should be fetched from the server
    opUsername: "",
    room: "",
    start: false
  };
  // componentDidMount() {
  //   const socket = socketIOClient(this.state.endPoint);
  //   socket.on("connect", () => {
  //     console.log("Connected to the server");
  //     socket.emit("join", {
  //       username: "Shivam"
  //     });
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("Connection to the server lost!");
  //   });
  // }
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
    if (this.state.start && this.state.opUsername) {
      content = <Playground username={this.state.username} />;
    } else if (this.state.start && !this.state.opUsername) {
      content = <p>Waiting for a player to join the match</p>;
    }
    return content;
  }
}

export default App;
