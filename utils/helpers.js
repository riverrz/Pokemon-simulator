const moves = require("../data/pokedex/moves.json");
const pokemon = require("../data/pokedex/pokemon.json");

function findPokemonIndex(pokemonName) {
  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].name === pokemonName) {
      return i;
    }
  }
  return -1;
}

function findMoveIndex(moveName) {
  for (let i = 0; i < moves.length; i++) {
    if (moves[i].name === moveName) {
      return i;
    }
  }
  return -1;
}

module.exports = {
  findPokemonIndex,
  findMoveIndex
};
