// To be replaced by REDIS

class Users {
  constructor() {
    this.list = [];
  }
  addUser(id, username, room) {
    this.list.push({
      id,
      username,
      room
    });
  }
  getUser(id) {
    return this.list.filter(user => user.id === id)[0];
  }
  getUsersByRoom(room) {
    return this.list.filter(user => user.room === room);
  }
  deleteUser(id) {
    this.list = this.list.filter(user => user.id !== id);
  }
}

module.exports = Users;
