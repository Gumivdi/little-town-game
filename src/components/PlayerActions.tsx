import { useContext } from "react";
import { EStatus } from "@/shared/enums/status.enum";
import { StatusContext } from "@/context/status.context";
import { MapContext } from "@/context/map.context";
import { BuildingsContext } from "@/context/buildings.context";
import { PlayersContext } from "@/context/players.context";
import { hasEnoughResources } from "@/shared/helpers/hasEnoughResources";

const PlayerActions = () => {
  const { setStatus } = useContext(StatusContext);
  const { activateMapFields } = useContext(MapContext);
  const { buildings, setAvailableBuildings } = useContext(BuildingsContext);
  const { currentPlayer, players } = useContext(PlayersContext);

  const player = players[currentPlayer];
  const haveEnoughBuildings = player.buildings > 0;
  const possibleToBuild = !!buildings.filter((building) => {
    const playerResources = player.resources;
    const buildingCost = building.cost;
    return hasEnoughResources(playerResources, buildingCost);
  }).length;

  const sendWorkerHandler = () => {
    setStatus(EStatus.SEND_WORKER);
    activateMapFields(EStatus.SEND_WORKER);
  };

  const buildHandler = () => {
    setStatus(EStatus.SELECT_BUILDING);
    setAvailableBuildings(player);
  };

  return (
    <>
      <button className="bg-black p-3 shrink-0" onClick={sendWorkerHandler}>
        Send worker
      </button>
      <button
        className="bg-black p-3 shrink-0"
        disabled={!haveEnoughBuildings || !possibleToBuild}
        onClick={buildHandler}
      >
        Build
      </button>
    </>
  );
};

export default PlayerActions;
