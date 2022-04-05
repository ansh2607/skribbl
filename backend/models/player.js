const { v4 } = require("uuid");

class Player {
  constructor(socket) {
    this.playerId = v4();
    this.socket = socket;
    this.name = "user";
    this.avatar = "avatar1";
    this.activeGame = null;

    this.socket.join(this.playerId);
  }

  get playerData() {
    return {
      id: this.playerId,
      name: this.name,
      avatar: this.avatar,
    };
  }

  setName(_name) {
    this.name = _name;
  }

  setAvatar(_avatar) {
    this.avatar = _avatar;
  }

  setActiveGame(session) {
    this.activeGame = session;
  }
}

module.exports = Player;
