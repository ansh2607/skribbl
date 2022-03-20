// const express = require("express");
// const app = express();
// const PORT = 4000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const { instrument } = require("@socket.io/admin-ui");

const io = require("socket.io")(4000, {
  cors: {
    origin: ["http://localhost:3001", "http://admin.socket.io"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("send-message", (message, room) => {
    // io.emit("recieve-message", message); // send message to everyone including sender
    // socket.broadcast.emit("receive-message", message); // send message to everyone except sender

    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined Room -> ${room}`);
  });
});

instrument(io, {
  auth: false,
});
