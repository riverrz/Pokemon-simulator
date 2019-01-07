'use strict';

const fs = require('fs');

let pokedata = fs.readFileSync('../data/pokedex/pokemon.json');

let pokemon = JSON.parse(pokedata);
for( var i=0;i<pokemon.length;i++){
console.log("Pokemon Name:"+pokemon[i].name);
console.log("Pokemon Types:"+pokemon[i].types);
console.log("Pokemon Health:"+pokemon[i].base.HP);
}
