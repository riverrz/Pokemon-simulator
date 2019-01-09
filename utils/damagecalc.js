const moves = require("../data/pokedex/moves.json");
const pokemon = require("../data/pokedex/pokemon.json");

var Attack_Stat = function(int moveIndex)     {   //move.category callled from attack onClick()
  if (
    moves[moveIndex].category == "physical"
  ) {
    return pokemon[attackerIndex].base.Attack;
  } else if(moves[moveIndex].category=="special"){
    return pokemon[attackerIndex].base.Sp_Attack;
  }
};

var Defense_Stat = function(int moveIndex) {
  if (
    moves[moveIndex].category == "physical"
  ) {
    return pokemon[targetIndex].base.Defense;
  } else if(moves[moveIndex].category=="special"){
    return pokemon[targetIndex].base.Sp_Defense;
  }
};

//attackerIndex denotes index of attacking pokemon
//targetIndex denotes index of target pokemon
var damage_calc = function(targetIndex, attackerIndex, moveIndex) {
  let level = pokemon[attackerIndex].level;
  let hp = pokemon[targetIndex].base.HP;
  let Move_Power = moves[moveIndex].power;
  let AtkStat = Attack_Stat(attackerIndex);
  let DefStat = Defense_Stat(targetIndex);
  if (random() == 1) {
    return 0;
  } else {
    hp = hp - Math.round(
      ((((2 * level) / 5 + 2) * Move_Power * AtkStat) / DefStat / 50 + 2) *
        Modifier();
    return hp;
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
  return Math.floor((Math.random() * 10) + 1);
};
var Modifier = function(){

      var critical = Math.floor((Math.random() * 10) + 1);
      if(critical==4)
      return 2*STAB(); // generation 1 onwards
      else
      return 1*STAB();
};
var STAB = function(attackerIndex,moveIndex){
 if( pokemon[attackerIndex].type[0] == moves[moveIndex].type || attackerIndex].type[1] == moves[moveIndex].type  ) {
   return 1.5;
 }
 else
 return 1;
}
module.exports = damage_calc;
