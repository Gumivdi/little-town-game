import { useContext } from "react";
import { ReactSVG } from "react-svg";
import classNames from "classnames";

import { ETerrains } from "@/shared/enums/terrains.enum";
import { TField } from "@/shared/types/map.type";
import { MapContext } from "@/context/map.context";
import { EStatus } from "@/shared/enums/status.enum";
import { PlayersContext } from "@/context/players.context";
import { StatusContext } from "@/context/status.context";
import { SupplyContext } from "@/context/supply.context";
import { BuildingsContext } from "@/context/buildings.context";
import Building from "@/components/Building/Building";

import ImgForrest from "@/assets/map/forrest.svg";
import ImgPond from "@/assets/map/pond.svg";
import ImgRocks from "@/assets/map/rocks.svg";
import ImgWorker from "@/assets/user.svg";

const fieldImages: Record<ETerrains, string | null> = {
  forrest: ImgForrest,
  pond: ImgPond,
  rocks: ImgRocks,
  grass: null,
};

const classes = {
  button: "border grow border-green-800 bg-green-700",
};

const MapField: React.FC<{ field: TField }> = ({ field }) => {
  const { selectedBuilding, removeBuilding } = useContext(BuildingsContext);
  const { takeFromSupply, restoreToSupply } = useContext(SupplyContext);
  const { status, setStatus } = useContext(StatusContext);
  const { map, sendWorker, activateMapFields, disableMapField, build } =
    useContext(MapContext);
  const {
    players,
    currentPlayer,
    receiveResources,
    payResources,
    updatePlayer,
    nextPlayer,
  } = useContext(PlayersContext);

  let ownerColor = "";
  let nameKey = "";
  const isGrass = field.type === ETerrains.GRASS;
  const isBuilding = isGrass && !!field.owner && !!field.building;
  const isOwnerWithoutBuilding = isGrass && !!field.owner && !field.building;
  if (isGrass) {
    ownerColor = players[field.owner! - 1]?.color;
    nameKey =
      field.building?.name
        .replace(" ", "_")
        .concat(`-${players[currentPlayer].id}`) || "";
  }

  const getFieldImage = (type: ETerrains) =>
    isGrass ? null : <ReactSVG src={fieldImages[type]!} />;

  const finishCollecting = () => {
    setStatus(EStatus.SELECT_ACTION);
    activateMapFields(EStatus.SELECT_ACTION);
    nextPlayer();
  };

  const actionHandler = () => {
    const player = players[currentPlayer];
    const { id, workers, buildings } = player;

    const isSomethingToCollect =
      map.flat().filter((item) => !item.disabled).length - 1;

    switch (status) {
      case EStatus.SEND_WORKER: {
        sendWorker(id, field);
        updatePlayer(id, { workers: workers - 1 });
        activateMapFields(EStatus.COLLECT, field.id);
        setStatus(EStatus.COLLECT);
        break;
      }

      case EStatus.COLLECT:
        {
          switch (field.type) {
            case ETerrains.FORREST: {
              const resource = { wood: 1 };
              takeFromSupply(resource);
              receiveResources(resource);
              break;
            }

            case ETerrains.POND: {
              const resource = { fish: 1 };
              takeFromSupply(resource);
              receiveResources(resource);
              break;
            }

            case ETerrains.ROCKS: {
              const resource = { stone: 1 };
              takeFromSupply(resource);
              receiveResources(resource);
              break;
            }

            default:
              break;
          }

          disableMapField(field.id!);
          if (!isSomethingToCollect) finishCollecting();
        }
        break;

      case EStatus.BUILD: {
        const building = selectedBuilding!;
        const { name, cost, point } = building;

        updatePlayer(id, {
          workers: workers - 1,
          buildings: buildings - 1,
        });
        payResources(cost);
        restoreToSupply(cost);
        build(field, building, id);
        receiveResources({ point });
        removeBuilding(name);
        setStatus(EStatus.SELECT_ACTION);
        activateMapFields(EStatus.SELECT_ACTION);
        nextPlayer();
        break;
      }

      default:
        break;
    }
  };

  return (
    <button
      onClick={actionHandler}
      disabled={field.disabled}
      className={classNames(classes.button, {
        "opacity-90": field.disabled,
        "hover:bg-green-600": !field.disabled,
      })}
    >
      {isOwnerWithoutBuilding && (
        <ReactSVG
          className={`size-8 text-${ownerColor}-600 mx-auto`}
          src={ImgWorker}
        />
      )}

      {isBuilding && (
        <Building>
          <header
            className={`w-full border-solid border-t-8 border-${ownerColor}-600`}
          ></header>
          <Building.Main building={field.building!} />
          <Building.Footer building={field.building!} nameKey={nameKey} />
        </Building>
      )}
      {getFieldImage(field.type)}
    </button>
  );
};

export default MapField;
