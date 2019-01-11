import React from "react";

const player = props => {
  let content = <p>LOADING.....</p>;
  console.log(props.stats)
  if (props.pokemon.name) {
    content = (
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
              {props.pokemon.base.HP}
            </div>
          </div>
          <span className="name">{props.pokemon.name.toUpperCase()}</span>
          <span className="level">{props.pokemon.level}</span>
        </div>
        <img
          className="pokemon"
          src={`https://img.pokemondb.net/sprites/black-white/anim/back-normal/${props.pokemon.name.toLowerCase()}.gif`}
          alt="Pokemon"
        />
      </div>
    );
  }
  return content;
};

export default player;
