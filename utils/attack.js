const damageCalc = require("./damagecalc");
const { findPokemonIndex, findMoveIndex } = require("./helpers");

// Should calculate the new target's health
// Update the opponent's health
// Generate resultant text
function attack(targetName, attackerName, attackName) {
  const targetIndex = findPokemonIndex(targetName);
  const attackerIndex = findPokemonIndex(attackerName);
  const moveIndex = findMoveIndex(attackName);

  console.log(damageCalc(targetIndex, attackerIndex, moveIndex));
}

// Testing
attack("Bulbasaur", "Ivysaur", "acid");
