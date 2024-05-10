import { useContext } from "react";
import { DPlayers } from "@/data/players.data";
import { TResourcesAll } from "@/shared/types/resources.type";
import { PlayersContext } from "@/context/players.context";
import { SupplyContext } from "@/context/supply.context";
import { convertToResourceOnly } from "@/shared/helpers/convertToResourceOnly";
import { setupPlayers } from "@/shared/helpers/setupPlayers";
import { setupResources } from "@/shared/helpers/setupResources";

const DevelopmentActions = () => {
  const {
    currentPlayer,
    initPlayers,
    nextPlayer,
    payResources,
    receiveResources,
  } = useContext(PlayersContext);

  const { takeFromSupply, restoreToSupply } = useContext(SupplyContext);

  const initializePlayers = () => {
    const resourcesRequired = convertToResourceOnly(
      setupResources(DPlayers.length)
    );
    initPlayers(setupPlayers(DPlayers));
    takeFromSupply(resourcesRequired);
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
      <button className="bg-black p-3" onClick={initializePlayers}>
        Init players
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
        Next player ({currentPlayer})
      </button>
    </div>
  );
};

export default DevelopmentActions;
