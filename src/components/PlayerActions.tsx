import { useContext } from "react";
import { EStatus } from "@/shared/enums/status.enum";
import { StatusContext } from "@/context/status.context";
import { MapContext } from "@/context/map.context";
import { BuildingsContext } from "@/context/buildings.context";
import { PlayersContext } from "@/context/players.context";

const PlayerActions = () => {
  const { setStatus } = useContext(StatusContext);
  const { activateMapFields } = useContext(MapContext);
  const { setAvailableBuildings } = useContext(BuildingsContext);
  const { currentPlayer, players } = useContext(PlayersContext);

  const sendWorkerHandler = () => {
    setStatus(EStatus.SEND_WORKER);
    activateMapFields(EStatus.SEND_WORKER);
  };

  const buildHandler = () => {
    setStatus(EStatus.SELECT_BUILDING);
    setAvailableBuildings(players[currentPlayer]);
  };

  return (
    <>
      <button className="bg-black p-3 shrink-0" onClick={sendWorkerHandler}>
        Send worker
      </button>
      <button className="bg-black p-3 shrink-0" onClick={buildHandler}>
        Build
      </button>
    </>
  );
};

export default PlayerActions;
