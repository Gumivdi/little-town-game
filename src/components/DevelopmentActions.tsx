import { useContext } from "react";
import { DPlayers } from "@/data/players.data";
import { DMaps } from "@/data/maps.data";
import { convertToResourceOnly } from "@/shared/helpers/convertToResourceOnly";
import { setupPlayers } from "@/shared/helpers/setupPlayers";
import { setupResources } from "@/shared/helpers/setupResources";
import { TResourcesAll } from "@/shared/types/resources.type";
import { PlayersContext } from "@/context/players.context";
import { SupplyContext } from "@/context/supply.context";
import { MapContext } from "@/context/map.context";
import { BuildingsContext } from "@/context/buildings.context";

const DevelopmentActions = () => {
  const { initMap } = useContext(MapContext);
  const { takeFromSupply, restoreToSupply } = useContext(SupplyContext);
  const { initRecommended } = useContext(BuildingsContext);
  const {
    currentPlayer,
    initPlayers,
    nextPlayer,
    payResources,
    receiveResources,
  } = useContext(PlayersContext);

  const initializePlayers = () => {
    const resourcesRequired = convertToResourceOnly(
      setupResources(DPlayers.length)
    );
    initPlayers(setupPlayers(DPlayers));
    takeFromSupply(resourcesRequired);
  };

  const initializeMap = (number: number) => {
    initMap(DMaps[number]);
  };

  const setupTheGame = () => {
    initializePlayers();
    initializeMap(0);
    initRecommended();
  };

  const pay = (resources: Partial<TResourcesAll>) => {
    payResources(resources);
    restoreToSupply(convertToResourceOnly(resources));
  };

  const receive = (resources: Partial<TResourcesAll>) => {
    receiveResources(resources);
    takeFromSupply(convertToResourceOnly(resources));
  };

  return (
    <div className="flex gap-3">
      <button className="bg-black p-3" onClick={setupTheGame}>
        Setup the game
      </button>
      <button
        className="bg-black p-3"
        onClick={() => pay({ wood: 2, stone: 2 })}
      >
        Pay
      </button>
      <button
        className="bg-black p-3"
        onClick={() => receive({ wood: 2, stone: 2, point: 3 })}
      >
        Receive
      </button>
      <button className="bg-black p-3" onClick={nextPlayer}>
        Next player ({currentPlayer.name})
      </button>
    </div>
  );
};

export default DevelopmentActions;
