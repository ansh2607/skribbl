import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinGame, changeGameState } from "./store/GameStore";
import { setPlayerName, setPlayerAvatar } from "./store/PlayerStore";
import Avatars from "./components/Avatars";
import { addPlayer, removePlayer } from "./store/GameStore";

export default function Home() {
  const { socket } = useSelector((state) => state.PlayerStore);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("avatar1");
  const dispatch = useDispatch();

  function selectAvatar(name) {
    setAvatar(name);
    for (let i = 1; i <= 38; i++) {
      document.getElementById(`avatar${i}`).classList.remove("avatar-selected");
    }
    document.getElementById(name).classList.add("avatar-selected");
  }

  const sumbitForm = (e) => {
    e.preventDefault();

    if (value === "") {
      socket.emit("session/create", name, avatar, (id) => {
        dispatch(joinGame(id));
      });
    } else {
      socket.emit("session/join", value, name, avatar, (id) => {
        dispatch(joinGame(id));
        console.log(id);
      });
    }
    dispatch(setPlayerName(name));
    dispatch(setPlayerAvatar(avatar));
    dispatch(changeGameState("lobby"));
  };

  useEffect(() => {
    const joinPlayer = (players) => {
      [...Object.values(players)].map((player) => {
        return dispatch(addPlayer(player));
      });
    };

    const leavePlayer = (player) => {
      dispatch(removePlayer(player));
    };

    socket.on("session/player/join", joinPlayer);
    socket.on("session/player/left", leavePlayer);
  }, [dispatch, socket]);

  return (
    <>
      <h1 className="home-header">Scribbl</h1>
      <div className="create-room">
        <div className="avatars">
          <p className="choose__avatar">Choose your look</p>
          <Avatars selectAvatar={selectAvatar} />
        </div>
        <form className="form_info" onSubmit={sumbitForm}>
          <input
            className="name-input"
            autoFocus
            value={name}
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
          <input
            className="room-input"
            value={value}
            placeholder="Enter room Id"
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />
          <button className="room-join-buttons">
            {value === "" && `Create Room`}
            {value !== "" && "Join Room"}
          </button>
        </form>
      </div>
    </>
  );
}
