import { useContext } from "react";
import { EStatus } from "@/shared/enums/status.enum";
import { PlayersContext } from "@/context/players.context";
import { StatusContext } from "@/context/status.context";
import { MapContext } from "@/context/map.context";
import InfoBar from "@/components/InfoBar";
import Map from "@/components/Map/Map";
import PlayerActions from "@/components/PlayerActions";

const MapArea: React.FC<{ className?: string }> = ({ className }) => {
  const { activateMapFields } = useContext(MapContext);
  const { players, nextPlayer } = useContext(PlayersContext);
  const { status, setStatus } = useContext(StatusContext);

  const finishAction = () => {
    nextPlayer();
    setStatus(EStatus.SELECT_ACTION);
    activateMapFields(EStatus.SELECT_ACTION);
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
