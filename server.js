const express = require("express");
const socketIO = require("socket.io");

const http = require("http");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "./data/pokedex")));

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = socketIO(server);

const Users = require("./utils/Users");

io.on("connection", socket => {
  socket.on("join", async data => {
    try {
      const usersInRoom = await Users.countUsers(data.room);
      if (usersInRoom >= 2) {
        socket.emit("exception", "Room is full");
      } else {
        await Users.addUser(socket.id, data.username, data.room, data.pokemon); // shouldnt be able to add user by same username
        await Users.addUserInRoom(data.room, socket.id);
        socket.join(data.room);
        const playerList = await Users.getUsersByRoom(data.room);
        if (playerList.length === 2) {
          io.to(data.room).emit("opponentJoined", playerList);
        }
      }
    } catch (err) {
      socket.emit("exception", "Some error occurred");
      console.log(err);
    }
  });
  socket.on("disconnect", async () => {
    const user = await Users.getUser(socket.id);
    if (user && user.room) {
      await Users.deleteRoom(user.room);
      socket.broadcast.to(user.room).emit("opponentLeft");
    }
  });
});

server.listen(PORT, () => {
  console.log("Server has started");
});
