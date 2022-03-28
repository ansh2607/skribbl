const uuidv4 = require("uuid").v4;
const { RoomId } = require("./RoomId");

const messages = new Set();
const users = new Map();

const defaultUser = {
  name: "user",
};

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("create-room", (name, func) => this.createRoom(name, func));
    socket.on("join-room", (room, name, func) =>
      this.joinRoom(room, name, func)
    );
    socket.on("disconnect", () => this.disconnect());
    socket.on("message", (value, room) => this.handleMessage(value, room));
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket.on("canvas-draw", (commands, room) =>
      this.drawOnCanvas(commands, room)
    );
  }

  createRoom(userName, setRoomIdFunction) {
    const id = RoomId();
    this.socket.join(id);
    users.set(this.socket, { name: userName });
    console.log(`Room created with room id ${id}`);
    console.log(`Player ${this.socket.id} joined room ${id}`);
    setRoomIdFunction(id);
  }

  joinRoom(room, userName, setRoomIdFunction) {
    this.socket.join(room);
    users.set(this.socket, { name: userName });
    console.log(`Player ${this.socket.id} joined room -> ${room}`);
    setRoomIdFunction(room);
  }

  disconnect() {
    users.delete(this.socket);
  }

  handleMessage(value, room) {
    const message = {
      id: uuidv4(),
      user: users.get(this.socket) || defaultUser,
      value,
      time: Date.now(),
      room: room,
    };

    messages.add(message);
    this.io.to(room).emit("message", message);

    setTimeout(() => {
      messages.delete(message);
      this.io.sockets.emit("deleteMessage", message.id);
    }, 10 * 60 * 1000);
  }

  drawOnCanvas(commands, room) {
    this.socket.broadcast.to(room).emit("canvas-draw", commands);
  }
}

function socketConnection(io) {
  io.on("connection", (socket) => {
    new Connection(io, socket);
  });
}

module.exports = socketConnection;
