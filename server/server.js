// require("dotenv").config();
// const server = require("http").createServer();
const express = require("express")
const socket = require("socket.io")
const app = express();

const server = app.listen(6000,()=>{
  console.log('The connection is done on 6000 Port')
})
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  client.on("send_message", (data) => {
    // Broadcast to all users
    io.sockets.emit("receive_message", data);
  });
});

server.listen(process.env.PORT || 5000);
