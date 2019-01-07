import React from "react";

const player = props => {
  return (
    <div className="player">
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
          <div id="myHP" className="hp-count">
            100
          </div>
        </div>
        <span className="name">{props.pokemon.toUpperCase()}</span>
        <span className="level">86</span>
      </div>
      <img
        className="pokemon"
        src={`http://play.pokemonshowdown.com/sprites/xyani/${
          props.pokemon
        }.gif`}
        alt="Pokemon"
      />
    </div>
  );
};

export default player;
