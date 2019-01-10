const damageCalc = require("./damagecalc");
const { findPokemonIndex, findMoveIndex } = require("./helpers");

// Should calculate the new target's health
// Update the opponent's health
// Generate resultant text
function attack(hp,targetName, attackerName, attackName) {
  const targetIndex = findPokemonIndex(targetName);
  const attackerIndex = findPokemonIndex(attackerName);
  const moveIndex = findMoveIndex(attackName);

  console.log(damageCalc(hp,targetIndex, attackerIndex, moveIndex));
}

// Testing
attack(100,"Bulbasaur", "Ivysaur", "acid");
