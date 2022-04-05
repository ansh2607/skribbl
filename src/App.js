import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket } from "./store/PlayerStore";
import { changeGameState } from "./store/GameStore";
import Home from "./Home";
import Game from "./Game";
import Lobby from "./Lobby";
import Connecting from "./Connecting";

function App() {
  const { gameState } = useSelector((state) => state.GameStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    dispatch(connectSocket(newSocket));
    dispatch(changeGameState("home"));
    return () => newSocket.close();
  }, [dispatch]);

  return (
    <div className="App">
      {gameState === "connecting" && <Connecting />}
      {gameState === "home" && <Home />}
      {gameState === "lobby" && <Lobby />}
      {gameState === "start" && <Game />}
    </div>
  );
}

export default App;
