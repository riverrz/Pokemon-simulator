import React, { Component } from "react";

class Landing extends Component {
  state = {
    pokemonNames: []
  };
  componentDidMount() {
    fetch("/pokemon/names")
      .then(res => res.json())
      .then(pokemonNames => {
        this.setState({
          pokemonNames
        });
      });
  }
  render() {
    const options = this.state.pokemonNames.map((name, i) => {
      return (
        <option key={i} value={name}>
          {name}
        </option>
      );
    });
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={this.props.handleUsername}
          required
        />
        <input
          type="text"
          placeholder="Room Name"
          onChange={this.props.handleRoom}
          required
        />
        <select
          name="pokemon"
          required
          onChange={this.props.handlePokemon}
          defaultValue=""
        >
          <option value="" hidden disabled>
            Select a pokemon
          </option>
          {options}
        </select>
        <button>Submit</button>
      </form>
    );
  }
}

export default Landing;
