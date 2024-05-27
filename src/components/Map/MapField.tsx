import { useContext } from "react";
import { ReactSVG } from "react-svg";
import classNames from "classnames";

import { EStatus } from "@/shared/enums/status.enum";
import { ETerrains } from "@/shared/enums/terrains.enum";
import { TField } from "@/shared/types/map.type";
import { hasEnoughResources } from "@/shared/helpers/hasEnoughResources";
import { convertToResourceOnly } from "@/shared/helpers/convertToResourceOnly";
import { calculateResources } from "@/shared/helpers/calculateResources";
import { TResourcesOnly } from "@/shared/types/resources.type";
import { MapContext } from "@/context/map.context";
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
    payToPlayer,
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
      field.building?.name.replace(" ", "_").concat(`-${currentPlayer.id}`) ||
      "";
  }

  const getFieldImage = (type: ETerrains) =>
    isGrass ? null : <ReactSVG src={fieldImages[type]!} />;

  const finishCollecting = () => {
    setStatus(EStatus.SELECT_ACTION);
    activateMapFields(EStatus.SELECT_ACTION);
    nextPlayer();
  };

  const actionHandler = () => {
    const { id, workers, buildings } = currentPlayer;

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
              const resource: Partial<TResourcesOnly> = { wood: 1 };
              takeFromSupply(resource);
              receiveResources(resource);
              break;
            }

            case ETerrains.POND: {
              const resource: Partial<TResourcesOnly> = { fish: 1 };
              takeFromSupply(resource);
              receiveResources(resource);
              break;
            }

            case ETerrains.ROCKS: {
              const resource: Partial<TResourcesOnly> = { stone: 1 };
              takeFromSupply(resource);
              receiveResources(resource);
              break;
            }

            case ETerrains.GRASS: {
              if (field.building?.action) {
                const buildingOwnerId = field.owner;
                const { require, benefit } = field.building.action;
                const { id: playerId, resources: playerResources } =
                  currentPlayer;
                const hasDifferentOwner =
                  buildingOwnerId && buildingOwnerId !== playerId;

                if (hasDifferentOwner) {
                  const cost: Partial<TResourcesOnly> = { coin: 1 };
                  const mergedCost = calculateResources(
                    require || {},
                    cost,
                    (a, b) => a + b
                  );

                  if (!hasEnoughResources(playerResources, mergedCost)) {
                    const costInfo = Object.entries(cost)
                      .map((item) => item.reverse().join(" "))
                      .join(" ");
                    console.log(
                      `Not enough resources to pay including the tax for the owner! Require additionaly - ${costInfo}`
                    );
                    return;
                  }
                  payToPlayer(cost, buildingOwnerId);
                }

                if (require) {
                  if (!hasEnoughResources(playerResources, require)) {
                    console.log(`Not enough resources!`);
                    return;
                  }
                  payResources(require);
                  restoreToSupply(convertToResourceOnly(require));
                }

                if (benefit) {
                  takeFromSupply(convertToResourceOnly(benefit));
                  receiveResources(benefit);
                }
              }
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
        restoreToSupply(convertToResourceOnly(cost));
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
