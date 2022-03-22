import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket } from "./store/GameStore";
import Home from "./Home";
import Lobby from "./Lobby";

function App() {
  const { gameState } = useSelector((state) => state.GameStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    dispatch(connectSocket(newSocket));
    return () => newSocket.close();
  }, [dispatch]);

  return (
    <div className="App">
      {gameState === "none" && <Home />}
      {gameState === "lobby" && <Lobby />}
    </div>
  );
}

export default App;
