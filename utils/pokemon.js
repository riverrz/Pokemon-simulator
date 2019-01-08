const pokemon = require("../data/pokedex/pokemon.json");

for (var i = 0; i < pokemon.length; i++) {
  console.log("Pokemon Name:" + pokemon[i].name);
  console.log("Pokemon Type:" + pokemon[i].type);
  console.log("Pokemon Health:" + pokemon[i].base.HP);
}
