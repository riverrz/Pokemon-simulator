const damageCalc = require("./damagecalc");
const { findPokemonIndex, findMoveIndex } = require("./helpers");
const { updateHealth } = require("./pokemon");

// Should calculate the new target's health
// Update the opponent's health
// Generate resultant text
function attack(userID, hp, targetName, attackerName, attackName) {
  const targetIndex = findPokemonIndex(targetName);
  const attackerIndex = findPokemonIndex(attackerName);
  const moveIndex = findMoveIndex(attackName);

  let newHP = damageCalc(hp, targetIndex, attackerIndex, moveIndex);
  if (newHP < 0) {
    newHP = 0;
  }

  return updateHealth(newHP, userID)
    .then(res => {
      return newHP;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
}

module.exports = {
  attack
};
