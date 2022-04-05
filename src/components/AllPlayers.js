import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SinglePlayer from "./SinglePlayer";

export default function AllPlayers() {
  const { players } = useSelector((state) => state.GameStore);
  const [allPlayers, setAllPlayers] = useState({});

  useEffect(() => {
    setAllPlayers(players);
  }, [players]);

  return (
    <div className="players">
      {[...Object.values(allPlayers)].map((player) => (
        <div key={player.id} className="players_show">
          {player.name}
          <SinglePlayer avatarName={player.avatar} />
        </div>
      ))}
    </div>
  );
}
