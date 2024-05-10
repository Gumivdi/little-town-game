import { useContext } from "react";
import { PlayersContext } from "@/context/players.context";
import Player from "@/components/Player/Player";

const Players = () => {
  const { players } = useContext(PlayersContext);

  return (
    <ul className="grid gap-2">
      {players.map((player) => {
        const playerKey = `player-${player.id}`;
        return <Player key={playerKey} data={player} />;
      })}
    </ul>
  );
};

export default Players;
