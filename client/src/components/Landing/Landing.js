import React from "react";

const landing = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        onChange={props.handleUsername}
        required
      />
      <input
        type="text"
        placeholder="Room Name"
        onChange={props.handleRoom}
        required
      />
      <select
        name="pokemon"
        required
        onChange={props.handlePokemon}
        defaultValue=""
      >
        <option value="" hidden disabled>
          Select a pokemon
        </option>
        <option value="charizard-megax">Charizard</option>
        <option value="blastoise-mega">Blastoise</option>
      </select>
      <button>Submit</button>
    </form>
  );
};

export default landing;
