const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = socketIO(server);

const Users = require("./Users/Users");
const users = new Users();

io.on("connection", socket => {
  socket.on("join", data => {
    users.deleteUser(socket.id);
    users.addUser(socket.id, data.username, data.room);
    socket.join(data.room);
    const playerList = users.getUsersByRoom(data.room);
    if (playerList.length === 2) {
      io.to(data.room).emit("opponentJoined", playerList);
    }
  });
  socket.on("disconnect", () => {
    console.log("User left");
    const user = users.getUser(socket.id);
    users.deleteUser(user.id);
    socket.broadcast.to(user.room).emit("opponentLeft");
  });
});

server.listen(PORT, () => {
  console.log("Server has started");
});
