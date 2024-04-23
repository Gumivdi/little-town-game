import { DPlayers } from "@/data/players.data";
import Player from "@/components/Player/Player";

const Players = () => {
  return (
    <ul className="grid gap-2">
      {DPlayers.map((player) => {
        const playerKey = `player-${player.id}`;
        return <Player key={playerKey} data={player} />;
      })}
    </ul>
  );
};

export default Players;
