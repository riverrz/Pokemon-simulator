import React from "react";

const opponent = props => {
  return (
    <div className="opponent">
      <div className="stats">
        <div className="top">
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
        <span className="name">Charizard</span>
        <span className="level">86</span>
      </div>
      <img
        className="pokemon"
        src="http://play.pokemonshowdown.com/sprites/xyani/charizard-megax.gif"
        alt="Pokemon"
      />
    </div>
  );
};

export default opponent;
