require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://prodesk-it-mission-12.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data.room);
    socket.username = data.username;
    socket.room = data.room;
    console.log(`${socket.id} joined ${data.room} as ${data.username}`);

    socket.to(data.room).emit("receive_message", {
      username: "System",
      message: `${data.username} has joined the room`,
    });
  });

  socket.on("send_message", (data) => {
    console.log("Message:", data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("typing", (data) => {
    socket.to(data.room).emit("typing", data.username);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
    if (socket.room && socket.username) {
      socket.to(socket.room).emit("receive_message", {
        username: "System",
        message: `${socket.username} has left the room`,
      });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Socket Server Running");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});