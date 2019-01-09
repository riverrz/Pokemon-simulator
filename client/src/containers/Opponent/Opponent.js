import React from "react";

const opponent = props => {
  return (
    <div className="opponent">
      <div className="stats">
        <div className="top">
          <div className="username__container">{props.username}</div>
          <div className="pokeballs">
            <div className="pokeball" />
            <div className="pokeball" />
            <div className="pokeball" />
            <div className="pokeball" />
            <div className="pokeball" />
          </div>
          <div id="apHP" className="hp-count">
            100
          </div>
        </div>
        <span className="name">{props.pokemon.toUpperCase()}</span>
        <span className="level">86</span>
      </div>
      <img
        className="pokemon"
        src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${props.pokemon.toLowerCase()}.gif`}
        alt="Pokemon"
      />
    </div>
  );
};

export default opponent;
