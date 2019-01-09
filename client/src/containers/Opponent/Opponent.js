import React from "react";

const opponent = props => {
  let content = <p>LOADING.....</p>;
  if (props.pokemon.name) {
    content = (
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
              {props.pokemon.base.HP}
            </div>
          </div>
          <span className="name">{props.pokemon.name.toUpperCase()}</span>
          <span className="level">{props.pokemon.level}</span>
        </div>
        <img
          className="pokemon"
          src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${props.pokemon.name.toLowerCase()}.gif`}
          alt="Pokemon"
        />
      </div>
    );
  }
  return content;
};

export default opponent;
