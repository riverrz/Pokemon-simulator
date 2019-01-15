const redis = require("redis");
const client = redis.createClient();

// Add a user by socket id in hset
function addUser(user) {
  return new Promise((resolve, reject) => {
    client.hmset(
      user.id,
      "username",
      user.username,
      "room",
      user.room,
      "id",
      user.id,
      "pokemon",
      user.pokemon,
      "pokemonHP",
      String(user.pokemonHP),
      "Attack",
      user.attack,
      "Defence",
      user.defence,
      "Speed",
      user.speed,
      "Sp_Attack",
      user.sp_attack,
      "Sp_Defence",
      user.sp_defence,
      "canAttack",
      "false",
      function(err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res);
      }
    );
  });
}

// remove a user by id or remove a room by name
function deleteKey(key) {
  return new Promise((resolve, reject) => {
    client.del(key, function(err, res) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}

// remove a room and users in it
async function deleteRoom(room) {
  const userList = await getUsersByRoom(room);
  const promiseArr = userList.map(id => deleteKey(id));
  await Promise.all(promiseArr);
  await deleteKey(room);
}

// create a room using a list with socket ids
async function addUserInRoom(room, id) {
  return new Promise((resolve, reject) => {
    client.lpush(String(room), id, function(err, res) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(res);
    });
  });
}

function countUsers(room) {
  return new Promise((resolve, reject) => {
    client.llen(room, function(err, len) {
      if (err) {
        return reject(err);
      }
      resolve(len);
    });
  });
}

// Get all users in room
function getUsersByRoom(room) {
  return new Promise((resolve, reject) => {
    client.lrange(room, 0, -1, async function(err, list) {
      if (err) {
        return reject(err);
      }
      const promiseArr = list.map(async id => await getUser(id));
      const res = await Promise.all(promiseArr);
      resolve(res);
    });
  });
}

// get a user by socket id
function getUser(id) {
  return new Promise((resolve, reject) => {
    client.hgetall(id, function(err, res) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}

function updateUserAttribute(id, key, value) {
  id = String(id);
  key = String(key);
  value = String(value);
  return new Promise((resolve, reject) => {
    client.hset(id, key, value, function(err, res) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}

function updateUser(id, obj) {
  return new Promise((resolve, reject) => {
    const promiseArr = Object.keys(obj).map(key => {
      return updateUserAttribute(id, key, obj[key]);
    });
    Promise.all(promiseArr)
      .then(res => {
        console.log("Updated");
        resolve(res);
      })
      .catch(err => reject(err));
  });
}

module.exports = {
  addUser,
  deleteKey,
  deleteRoom,
  addUserInRoom,
  getUsersByRoom,
  getUser,
  countUsers,
  updateUser
};
