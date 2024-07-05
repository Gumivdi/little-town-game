import { DSetup } from "@/data/setup.data";
import { TPlayer } from "@/shared/types/player.type";

export const verifyEndRound = (
  players: TPlayer[],
  round: number,
  scenarios: {
    prepareNextRound: (nextRound: number, startingWorkers: number) => void;
    draw: () => void;
    win: (winner: TPlayer) => void;
  }
) => {
  const anyPlayerHaveWorker = players.filter(
    (player) => player.workers > 0
  ).length;
  const { prepareNextRound, draw, win } = scenarios;

  if (!anyPlayerHaveWorker) {
    const nextRound = round + 1;
    const startingWorkers = DSetup[players.length - 2].workers;

    if (round === 4) {
      const playersScore = players.map((item) => item.resources.point);
      const winnerScore = Math.max(...playersScore);
      const winner = players.filter(
        (player) => player.resources.point === winnerScore
      );
      winner.length > 1 ? draw() : win(winner[0]);

      return;
    }

    prepareNextRound(nextRound, startingWorkers);
  }
};
