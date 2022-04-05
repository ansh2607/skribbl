import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllPlayers from "./components/AllPlayers";
import Settings from "./components/Settings";
import { changeGameState, setTime } from "./store/GameStore";

export default function Lobby() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.PlayerStore);
  const { rounds, time } = useSelector((state) => state.GameStore);

  const setGameState = () => {
    socket.emit("session/start", rounds, time);
  };

  useEffect(() => {
    const startGame = (timer) => {
      dispatch(setTime(timer));
      dispatch(changeGameState("start"));
    };

    socket.on("game/start", startGame);
  }, [dispatch, socket]);

  return (
    <div className="lobby">
      <div className="lobby_info">
        <Settings />
        <button className="start" onClick={setGameState}>
          Start
        </button>
      </div>
      <AllPlayers />
    </div>
  );
}
