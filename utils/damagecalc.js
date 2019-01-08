const moves = require("../data/pokedex/moves.json");
const pokemon = require("../data/pokedex/pokemon.json");

var Attack_Stat = function(attackerIndex) {
  if (
    pokemon[attackerIndex].base.Attack > pokemon[attackerIndex].base.Sp_Attack
  ) {
    return pokemon[attackerIndex].base.Attack;
  } else {
    return pokemon[attackerIndex].base.Sp_Attack;
  }
};

var Defense_Stat = function(targetIndex) {
  if (
    pokemon[targetIndex].base.Defense > pokemon[targetIndex].base.Sp_Defense
  ) {
    return pokemon[targetIndex].base.Defense;
  } else {
    return pokemon[targetIndex].base.Sp_Defense;
  }
};

//attackerIndex denotes index of attacking pokemon
//targetIndex denotes index of target pokemon
var damage_calc = function(targetIndex, attackerIndex, moveIndex) {
  let level = pokemon[attackerIndex].level;
  let Move_Power = moves[moveIndex].power;
  let AtkStat = Attack_Stat(attackerIndex);
  let DefStat = Defense_Stat(targetIndex);
  let Modifier = 1;
  if (random() < 1) {
    return 0;
  } else {
    return Math.round(
      ((((2 * level) / 5 + 2) * Move_Power * AtkStat) / DefStat / 50 + 2) *
        Modifier
    );
  }
};

var effect = function(moveIndex) {
  if (
    moves[moveIndex].effect.chance ||
    moves[moveIndex].effect.stat ||
    moves[moveIndex].effect.stages
  ) {
    return (
      " Chance: " +
      moves[moveIndex].effect.chance +
      " Stat:" +
      moves[moveIndex].effect.stat +
      " Stages:" +
      moves[moveIndex].effect.stages
    );
  } else {
    return moves[moveIndex].effect;
  }
};

var random = function() {
  return Math.floor(Math.random() * Math.floor(3));
};

module.exports = damage_calc;
