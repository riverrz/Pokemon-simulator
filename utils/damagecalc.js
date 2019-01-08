const fs = require("fs");
const path = require("path");
const pathToMoves = path.join(__dirname, "../data/pokedex/moves.json");
const pathToPokemon = path.join(__dirname, "../data/pokedex/pokemon.json");

let attackdata = fs.readFileSync(pathToMoves);
let moves = JSON.parse(attackdata);

let pokedata = fs.readFileSync(pathToPokemon);
let pokemon = JSON.parse(pokedata);

let attacker = 1; //attacking Pokemon
let target = 3; // Target Pokemon
let attack = 1; // Attack Move

var Attack_Stat = function(attacker) {
  if (pokemon[attacker].base.Attack > pokemon[attacker].base.Sp_Attack) {
    return pokemon[attacker].base.Attack;
  } else {
    return pokemon[attacker].base.Sp_Attack;
  }
};

var Defense_Stat = function(target) {
  if (pokemon[target].base.Defense > pokemon[target].base.Sp_Defense) {
    return pokemon[target].base.Defense;
  } else {
    return pokemon[target].base.Sp_Defense;
  }
};

//attacker denotes attacking pokemon
//target denotes target pokemon
var damage_calc = function() {
  let level = pokemon[attacker].level;
  let Move_Power = moves[attack].power;
  let AtkStat = Attack_Stat(attacker);
  let DefStat = Defense_Stat(target);
  let Modifier = 1;
  if (random() < 1) {
    return 0;
  } else {
    return (
      ((((2 * level) / 5 + 2) * Move_Power * AtkStat) / DefStat / 50 + 2) *
        Modifier +
      "%"
    );
  }
};

var effect = function() {
  if (
    moves[attack].effect.chance ||
    moves[attack].effect.stat ||
    moves[attack].effect.stages
  ) {
    let chance = moves[attack].effect.chance;
    return (
      " Chance: " +
      moves[attack].effect.chance +
      " Stat:" +
      moves[attack].effect.stat +
      " Stages:" +
      moves[attack].effect.stages
    );
  } else {
    return moves[attack].effect;
  }
};

var random = function() {
  return Math.floor(Math.random() * Math.floor(3));
};

console.log(
  pokemon[attacker].name + " Used " + moves[attack].name + " attack! "
);

/*if(damage_calc()<1){
  //let output1 = pokemon[target].name + " dodged the " + moves[attack].name + "! attack";
  //console.log(output1);
  console.log("dodge");
}else {
   //let output2 = pokemon[target].name + " got hit by " + moves[attack].name + "! attack";
   //console.log(output2);
   console.log("Hit");
}*/
console.log(
  pokemon[target].name + " got hit by " + moves[attack].name + "! attack"
);
console.log(pokemon[target].name + " recieved " + damage_calc() + " damage.");

console.log("Effect=>" + effect());
