import { useContext } from "react";
import classNames from "classnames";
import { EStatus } from "@/shared/enums/status.enum";
import { StatusContext } from "@/context/status.context";
import { BuildingsContext } from "@/context/buildings.context";
import Building from "@/components/Building/Building";
import { MapContext } from "@/context/map.context";

const BuildingsStore = () => {
  const { status, setStatus } = useContext(StatusContext);
  const { buildings, availableBuildings } = useContext(BuildingsContext);
  const { activateMapFields } = useContext(MapContext);
  const { selectBuilding } = useContext(BuildingsContext);

  return buildings.map((building) => {
    const { name } = building;

    const nameKey = name.replace(" ", "_").concat("-store");
    const costKey = nameKey.concat("-cost");

    const isCorrectStatus = status === EStatus.SELECT_BUILDING;
    const canBePaid = availableBuildings.includes(building.name);
    const isDisabled = !isCorrectStatus || !canBePaid;

    const placeBuildingHandler = () => {
      selectBuilding(building);
      setStatus(EStatus.BUILD);
      activateMapFields(EStatus.BUILD);
    };

    return (
      <div
        key={nameKey}
        className={classNames("relative", {
          "opacity-60": isDisabled,
        })}
      >
        <button
          className="w-full h-full absolute top-0 left-0 text-transparent"
          disabled={isDisabled}
          onClick={placeBuildingHandler}
        >
          Build {name}
        </button>
        <Building>
          <Building.Header building={building} costKey={costKey} />
          <Building.Main building={building} />
          <Building.Footer building={building} nameKey={nameKey} />
        </Building>
      </div>
    );
  });
};

export default BuildingsStore;
