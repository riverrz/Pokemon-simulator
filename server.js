const express = require("express");
const socketIO = require("socket.io");

const http = require("http");

const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = socketIO(server);

const Users = require("./utils/Users");

io.on("connection", socket => {
  socket.on("join", async data => {
    await Users.addUser(socket.id, data.username, data.room);
    socket.join(data.room);
    await Users.addUserInRoom(data.room, socket.id);
    const playerList = await Users.getUsersByRoom(data.room);
    if (playerList.length === 2) {
      io.to(data.room).emit("opponentJoined", playerList);
    }
  });
  socket.on("disconnect", async () => {
    console.log("User left");
    const {room} = await Users.getUser(socket.id);
    await Users.deleteRoom(room);
    socket.broadcast.to(room).emit("opponentLeft");
  });
});

server.listen(PORT, () => {
  console.log("Server has started");
});
