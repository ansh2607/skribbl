import React from "react";
import AllPlayers from "./components/AllPlayers";
import Chat from "./components/Chat";
import Canvas from "./components/Canvas";

export default function Game() {
  return (
    <div>
      <Chat />
      <Canvas />
      <AllPlayers />
    </div>
  );
}
