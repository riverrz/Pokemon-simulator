const moves = require("../data/pokedex/moves.json");
const pokemon = require("../data/pokedex/pokemon.json");

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
var damage_calc = function(target, attacker, attack) {
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

console.log(damage_calc(1, 1, 1)); // find index of attacker, find index of attack, find index of target

module.exports = damage_calc;
