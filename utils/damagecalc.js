const moves = require("../data/pokedex/moves.json");
const pokemon = require("../data/pokedex/pokemon.json");

function Attack_Stat(moveIndex, attackerIndex) {
  //move.category callled from attack onClick()
  if (moves[moveIndex].category == "physical") {
    return pokemon[attackerIndex].base.Attack;
  } else if (moves[moveIndex].category == "special") {
    return pokemon[attackerIndex].base.Sp_Attack;
  }
}

function Defence_Stat(moveIndex, targetIndex) {
  if (moves[moveIndex].category == "physical") {
    return pokemon[targetIndex].base.Defence;
  } else if (moves[moveIndex].category == "special") {
    return pokemon[targetIndex].base.Sp_Defence;
  }
}

//attackerIndex denotes index of attacking pokemon
//targetIndex denotes index of target pokemon
function damage_calc(hp, targetIndex, attackerIndex, moveIndex) {
  const level = pokemon[attackerIndex].level;
  const Move_Power = moves[moveIndex].power;
  const AtkStat = Attack_Stat(moveIndex, attackerIndex);
  const DefStat = Defence_Stat(moveIndex, targetIndex);
  if (random() == 1) {
    return 0;
  } else {
    hp =
      hp -
      Math.round(
        ((((2 * level) / 5 + 2) * Move_Power * AtkStat) / DefStat / 50 + 2) *
          Modifier(attackerIndex, moveIndex)
      );
    return hp;
  }
}

function effect(moveIndex) {
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
}

function random() {
  return Math.floor(Math.random() * 10 + 1);
}
function Modifier(attackerIndex, moveIndex) {
  var critical = Math.floor(Math.random() * 10 + 1);
  if (critical == 4) return 2 * STAB(attackerIndex, moveIndex);
  // generation 1 onwards
  else return 1 * STAB(attackerIndex, moveIndex);
}
function STAB(attackerIndex, moveIndex) {
  if (
    pokemon[attackerIndex].type[0] == moves[moveIndex].type ||
    pokemon[attackerIndex].type[1] == moves[moveIndex].type
  ) {
    return 1.5;
  } else return 1;
}
module.exports = damage_calc;
