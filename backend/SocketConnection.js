// const uuidv4 = require("uuid").v4;
// const { RoomId } = require("./RoomId");

// const messages = new Set();
// const users = new Map();
// var rooms = {};

// const defaultUser = {
//   id: -1,
//   name: "user",
//   avatar: "avatar1",
// };

// function addUserToRoom(room, user) {
//   rooms[room] = rooms[room] || [];
//   rooms[room].push(user);
// }

// function removeUserFromRoom(room, user) {
//   rooms[room] = rooms[room] || [];

//   for (let i = 0; i < rooms[room].length; i++) {
//     if (rooms[room][i].id === user.id) {
//       rooms[room].splice(i, 1);
//       i--;
//     }
//   }

//   if (rooms[room].length === 0) {
//     delete rooms[room];
//   }
// }

// class Connection {
//   constructor(io, socket) {
//     this.socket = socket;
//     this.io = io;
//     this.room = "";

//     socket.on("create-room", (name, avatar, func) =>
//       this.createRoom(name, avatar, func)
//     );
//     socket.on("join-room", (room, name, avatar, func) =>
//       this.joinRoom(room, name, avatar, func)
//     );
//     socket.on("start-game", (rounds, timer) => this.startGame(rounds, timer));
//     socket.on("disconnect", () => this.disconnect());
//     socket.on("message", (value, room) => this.handleMessage(value, room));
//     socket.on("connect_error", (err) => {
//       console.log(`connect_error due to ${err.message}`);
//     });
//     socket.on("canvas-draw", (commands, room) =>
//       this.drawOnCanvas(commands, room)
//     );
//   }

//   startGame(rounds, timer) {
//     this.socket.broadcast.to(this.room).emit("start-game");
//   }

//   createRoom(userName, userAvatar, setRoomIdFunction) {
//     const id = RoomId();
//     this.room = id;
//     this.socket.join(id);
//     users.set(this.socket, {
//       id: this.socket.id,
//       name: userName,
//       avatar: userAvatar,
//     });
//     addUserToRoom(this.room, users.get(this.socket));
//     console.log(`Room created with room id ${id}`);
//     console.log(`Player ${this.socket.id} joined room ${id}`);
//     setRoomIdFunction(id);
//     this.io.to(this.room).emit("player-joined", rooms[this.room]);
//   }

//   joinRoom(room, userName, userAvatar, setRoomIdFunction) {
//     this.room = room;
//     this.socket.join(room);
//     users.set(this.socket, {
//       id: this.socket.id,
//       name: userName,
//       avatar: userAvatar,
//     });
//     console.log(`Player ${this.socket.id} joined room -> ${room}`);
//     setRoomIdFunction(room);
//     addUserToRoom(this.room, users.get(this.socket));
//     this.io.to(this.room).emit("player-joined", rooms[this.room]);
//   }

//   disconnect() {
//     removeUserFromRoom(this.room, users.get(this.socket));
//     this.io.to(this.room).emit("player-left", users.get(this.socket));
//     users.delete(this.socket);
//   }

//   handleMessage(value, room) {
//     const message = {
//       id: uuidv4(),
//       user: users.get(this.socket) || defaultUser,
//       value,
//       time: Date.now(),
//       room: room,
//     };

//     messages.add(message);
//     this.io.to(room).emit("message", message);

//     setTimeout(() => {
//       messages.delete(message);
//       this.io.sockets.emit("deleteMessage", message.id);
//     }, 10 * 60 * 1000);
//   }

//   drawOnCanvas(commands, room) {
//     this.socket.broadcast.to(room).emit("canvas-draw", commands);
//   }
// }

// function socketConnection(io) {
//   io.on("connection", (socket) => {
//     new Connection(io, socket);
//   });
// }

// module.exports = socketConnection;

const {
  join,
  create,
  chat,
  disconnect,
  startGame,
  draw,
} = require("./gameSession");
const Player = require("./models/player");

class Connection {
  constructor(socket) {
    this.socket = socket;
    const player = new Player(socket);

    socket.on("session/create", (name, avatar, func) =>
      create(player, name, avatar, func)
    );

    socket.on("session/join", (room, name, avatar, func) =>
      join(room, player, name, avatar, func)
    );

    socket.on("disconnect", () => disconnect(player));

    socket.on("session/start", (rounds, time) =>
      startGame(player, rounds, time)
    );

    socket.on("session/chat", (message) => chat(player, message));

    socket.on("round/draw", (commands) => draw(player, commands));

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
}

function socketConnection(io) {
  io.on("connection", (socket) => {
    new Connection(socket);
  });
}

module.exports = socketConnection;
