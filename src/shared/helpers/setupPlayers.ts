import { DSetup } from "@/data/setup.data";
import { TPlayer } from "@/shared/types/player.type";

export const setupPlayers = (players: TPlayer[]) => {
  const selectedSetup = DSetup[players.length - 2];
  const preparedPlayers = players.map((player) => ({
    ...player,
    ...selectedSetup,
    resources: {
      ...player.resources,
      ...selectedSetup.resources,
    },
  }));
  return preparedPlayers;
};
