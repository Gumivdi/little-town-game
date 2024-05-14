import { useContext } from "react";
import { EStatus } from "@/shared/enums/status.enum";
import { PlayersContext } from "@/context/players.context";
import { StatusContext } from "@/context/status.context";
import InfoBar from "@/components/InfoBar";
import Map from "@/components/Map/Map";

const MapArea: React.FC<{ className?: string }> = ({ className }) => {
  const { players, nextPlayer } = useContext(PlayersContext);
  const { status, setStatus } = useContext(StatusContext);

  const finishAction = () => {
    nextPlayer();
    setStatus(EStatus.SELECT_ACTION);
  };

  return (
    <section className={`${className} relative`}>
      {!!players.length && (
        <InfoBar>
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
