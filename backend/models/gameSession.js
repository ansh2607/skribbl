const { v4 } = require("uuid");
const randomWord = require("./words");

class GameSession {
  constructor() {
    this.sessionId = v4();
    this.players = [];
    this.drawer = null;

    this._totalRounds = 1;
    this._timer = 1;
    this._scoreboard = {};
    this._nextDrawerIndex = 0;
    this._currentWord = null;
    this._playedRounds = 0;
    this._currentRoundId = null;
    this._pointsPerPlayer = 50;
    this._gainedPoints = 500;
  }

  get totalRounds() {
    return this._totalRounds;
  }

  get timer() {
    return this._timer;
  }

  get scoreboard() {
    return this._scoreboard;
  }

  get currentWord() {
    return this._currentWord;
  }

  get playedRounds() {
    return this._playedRounds;
  }

  setTotalRounds(total) {
    this._totalRounds = total;
  }

  setTimer(timer) {
    this._timer = Math.floor(timer);
  }

  addPlayer(player) {
    this.players.push(player);
    player.setActiveGame(this);
    this._scoreboard[player.playerId] = {
      points: 0,
      roundScores: {},
    };
    player.socket.join(this.sessionId);
  }

  removePlayer(player) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].playerId === player.playerId) {
        this.players.splice(i, 1);
        i--;
      }
    }

    delete this._scoreboard[player.playerId];
    return this.players.length;
  }

  roundStart() {
    if (this.players.length >= 2) {
      this.drawer = this.players[this._nextDrawerIndex];
      this._nextDrawerIndex = (this._nextDrawerIndex + 1) % this.players.length;
      this._gainedPoints = this.players.length * 50;
      this._playedRounds += 1;
      this._currentWord = randomWord();
      this._currentRoundId = v4();
      return true;
    }
    return false;
  }

  roundEnd() {
    this._currentRoundId = null;
  }

  guessWord(player, guess) {
    if (this._scoreboard[player.playerId].roundScores[this._currentRoundId]) {
      if (this._currentRoundId && guess === this._currentWord) {
        return true;
      }
      return false;
    }

    if (this._currentRoundId && guess === this._currentWord) {
      // Guesser get gained Points
      this._scoreboard[player.playerId].points += this._gainedPoints;
      this._scoreboard[player.playerId].roundScores[this._currentRoundId] =
        this._gainedPoints;
      this._gainedPoints -= 50;

      // Drawer gets 50 points
      this._scoreboard[this.drawer.playerId].points += this._pointsPerPlayer;
      this._scoreboard[player.playerId].roundScores[this._currentRoundId] +=
        this._pointsPerPlayer;

      return true;
    }
    return false;
  }
}

module.exports = GameSession;
