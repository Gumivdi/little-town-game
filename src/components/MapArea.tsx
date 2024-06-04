import { useContext } from "react";
import { DSetup } from "@/data/setup.data";
import { EStatus } from "@/shared/enums/status.enum";
import { PlayersContext } from "@/context/players.context";
import { StatusContext } from "@/context/status.context";
import { MapContext } from "@/context/map.context";
import InfoBar from "@/components/InfoBar";
import Map from "@/components/Map/Map";
import PlayerActions from "@/components/PlayerActions";

const MapArea: React.FC<{ className?: string }> = ({ className }) => {
  const { activateMapFields, cleanupMapWorkers } = useContext(MapContext);
  const { players, nextPlayer, preparePlayersToNextRound } =
    useContext(PlayersContext);
  const { status, round, setStatus, setRound } = useContext(StatusContext);

  const finishAction = () => {
    const anyPlayerHaveWorker = players.filter(
      (player) => player.workers
    ).length;

    nextPlayer();
    setStatus(EStatus.SELECT_ACTION);
    activateMapFields(EStatus.SELECT_ACTION);

    if (!anyPlayerHaveWorker) {
      const nextRound = round + 1;
      const startingWorkers = DSetup[players.length - 2].workers;

      if (round === 4) {
        const playersScore = players.map((item) => item.resources.point);
        const winnerScore = Math.max(...playersScore);
        const winner = players.filter(
          (player) => player.resources.point === winnerScore
        );
        winner.length > 1
          ? console.log(
              `It looks like there is no winner because more than one player has the same amount of points`
            )
          : console.log(
              `Game over! The winner is ${winner[0]?.name}! Congratulations!`
            );

        return;
      }

      cleanupMapWorkers();
      setRound(nextRound);
      preparePlayersToNextRound(startingWorkers, nextRound);
    }
  };

  return (
    <section className={`${className} relative`}>
      {!!players.length && (
        <InfoBar>
          {status === EStatus.SELECT_ACTION && (
            <div className="w-max flex gap-2 -my-3 -mr-3 ml-auto justify-end">
              <PlayerActions />
            </div>
          )}
          {status === EStatus.COLLECT && (
            <button className="bg-red-800 p-3 -m-3" onClick={finishAction}>
              Finish
            </button>
          )}
        </InfoBar>
      )}
      <Map />
    </section>
  );
};

export default MapArea;
