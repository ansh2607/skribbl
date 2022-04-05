const io = require("socket.io");
const GameSessionServices = require("./services/gameSessionServices");
const liveGameService = require("./services/liveGameService");

function create(player, userName, userAvatar, setRoomIdFunction) {
  player.setName(userName);
  player.setAvatar(userAvatar);
  const gameSession = liveGameService.createGame();
  const gameSessionService = new GameSessionServices(gameSession);
  setRoomIdFunction(gameSession.sessionId);
  gameSessionService.joinSession(player);
}

function join(room, player, userName, userAvatar, setRoomIdFunction) {
  player.setName(userName);
  player.setAvatar(userAvatar);
  const gameSession = liveGameService.findGame(room);

  if (gameSession) {
    const gameSessionService = new GameSessionServices(gameSession);
    setRoomIdFunction(gameSession.sessionId);
    gameSessionService.joinSession(player);
  }
}

function disconnect(player) {
  if (player.activeGame) {
    const gameSession = liveGameService.findGame(player.activeGame.sessionId);
    const gameSessionService = new GameSessionServices(gameSession);
    const playersLeft = gameSessionService.leaveSession(player);

    if (playersLeft === 0) {
      liveGameService.deleteGame(gameSession.sessionId);
    }
  }
}

function startGame(player, rounds, timer) {
  const gameSession = liveGameService.findGame(player.activeGame.sessionId);
  const gameSessionService = new GameSessionServices(gameSession);
  gameSessionService.setRoomSettings(rounds, timer);
  gameSessionService.startSessionRound(player);
}

function chat(player, message) {
  const gameSession = liveGameService.findGame(player.activeGame.sessionId);
  const gameSessionService = new GameSessionServices(gameSession);
  gameSessionService.playerGuess(player, message);
}

function draw(player, commands) {
  player.socket.to(player.activeGame.sessionId).emit("canvas-draw", commands);
}

module.exports = {
  join,
  create,
  disconnect,
  startGame,
  chat,
  draw,
};
