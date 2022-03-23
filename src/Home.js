import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinGame, changeGameState } from "./store/GameStore";

export default function Home() {
  const { socket } = useSelector((state) => state.GameStore);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const sumbitForm = (e) => {
    e.preventDefault();

    if (value === "") {
      socket.emit("create-room", name, (id) => {
        dispatch(joinGame(id));
      });
    } else {
      socket.emit("join-room", value, name, (id) => {
        dispatch(joinGame(id));
        console.log(id);
      });
    }
    dispatch(changeGameState("lobby"));
  };

  return (
    <>
      <h1 className="home-header">Scribble Home Page</h1>
      <div className="create-room">
        <form onSubmit={sumbitForm}>
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
