import { useContext } from "react";
import { EStatus } from "@/shared/enums/status.enum";
import { verifyEndRound } from "@/shared/helpers/verifyEndRound";
import { PlayersContext } from "@/context/players.context";
import { StatusContext } from "@/context/status.context";
import { MapContext } from "@/context/map.context";
import InfoBar from "@/components/InfoBar";
import Map from "@/components/Map/Map";
import PlayerActions from "@/components/PlayerActions";
import { ToastContext } from "@/context/toast.context";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";

const MapArea: React.FC<{ className?: string }> = ({ className }) => {
  const { activateMapFields, cleanupMapWorkers } = useContext(MapContext);
  const { players, nextPlayer, preparePlayersToNextRound } =
    useContext(PlayersContext);
  const { status, round, setStatus, setRound } = useContext(StatusContext);
  const { showToast } = useContext(ToastContext);

  const finishAction = () => {
    nextPlayer();
    setStatus(EStatus.SELECT_ACTION);
    activateMapFields(EStatus.SELECT_ACTION);

    verifyEndRound(players, round, {
      prepareNextRound: (nextRound, startingWorkers) => {
        cleanupMapWorkers();
        setRound(nextRound);
        preparePlayersToNextRound(startingWorkers, nextRound);
        showToast(ERequestStatus.WARNING, `Round ${nextRound}/4`);
      },
      draw: () => {
        console.log(
          `It looks like there is no winner because more than one player has the same amount of points`
        );
      },
      win: ({ name }) => {
        console.log(`Game over! The winner is ${name}! Congratulations!`);
      },
    });
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
