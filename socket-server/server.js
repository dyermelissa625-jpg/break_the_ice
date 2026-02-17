const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const ticTacToe = require("./games/tic-tac-toe");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  ticTacToe(io, socket); // attach tic tac toe handlers
});

server.listen(3001, () => {
  console.log("Game server running on port 3001");
});



