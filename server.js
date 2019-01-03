const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = socketIO(server);

io.on("connection", socket => {
  socket.on("join", data => {
    console.log(`${data.username} connected`);
  });
  socket.on("disconnect", () => {
    console.log("User left")
  })
});

server.listen(PORT, () => {
  console.log("Server has started");
});
