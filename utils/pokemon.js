const redis = require("redis");
const client = redis.createClient();

const Users = require("./Users");

function updateHealth(newHP, userID) {
  return new Promise((resolve, reject) => {
    client.hset(userID, "pokemonHP", String(newHP), function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

module.exports = {
  updateHealth
};
