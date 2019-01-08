const fs = require("fs");
const path = require("path");
const pathTo = path.join(__dirname, "../data/pokedex/pokemon.json");
let pokedata = fs.readFileSync(pathTo);

let pokemon = JSON.parse(pokedata);
for (var i = 0; i < pokemon.length; i++) {
  console.log("Pokemon Name:" + pokemon[i].name);
  console.log("Pokemon Type:" + pokemon[i].type);
  console.log("Pokemon Health:" + pokemon[i].base.HP);
}
