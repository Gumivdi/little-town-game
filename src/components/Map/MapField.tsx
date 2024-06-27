import { useContext } from "react";
import { ReactSVG } from "react-svg";
import classNames from "classnames";

import { EStatus } from "@/shared/enums/status.enum";
import { ETerrains } from "@/shared/enums/terrains.enum";
import { TField } from "@/shared/types/map.type";
import { TResourcesAll, TResourcesOnly } from "@/shared/types/resources.type";
import { hasEnoughResources } from "@/shared/helpers/hasEnoughResources";
import { convertToResourceOnly } from "@/shared/helpers/convertToResourceOnly";
import { calculateResources } from "@/shared/helpers/calculateResources";
import { MapContext } from "@/context/map.context";
import { PlayersContext } from "@/context/players.context";
import { StatusContext } from "@/context/status.context";
import { SupplyContext } from "@/context/supply.context";
import { BuildingsContext } from "@/context/buildings.context";
import { ToastContext } from "@/context/toast.context";
import Building from "@/components/Building/Building";

import ImgForrest from "@/assets/map/forrest.svg";
import ImgPond from "@/assets/map/pond.svg";
import ImgRocks from "@/assets/map/rocks.svg";
import ImgWorker from "@/assets/user.svg";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import { verifyEndRound } from "@/shared/helpers/verifyEndRound";

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
  const { supply, takeFromSupply, restoreToSupply } = useContext(SupplyContext);
  const { round, status, setStatus, setRound } = useContext(StatusContext);
  const {
    map,
    sendWorker,
    activateMapFields,
    disableMapField,
    build,
    cleanupMapWorkers,
  } = useContext(MapContext);
  const { showToast } = useContext(ToastContext);
  const {
    players,
    currentPlayer,
    receiveResources,
    payResources,
    payToPlayer,
    updatePlayer,
    nextPlayer,
    preparePlayersToNextRound,
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

  const collectAvailableResources = (resources: Partial<TResourcesAll>) => {
    const calculatedResources = convertToResourceOnly(
      calculateResources(supply, resources, (a, b) => a - b)
    );
    const missingResources = Object.fromEntries(
      Object.entries(calculatedResources).filter(
        ([key, value]) => key && value < 0
      )
    );

    if (Object.entries(missingResources).length) {
      const resourcesToTake = calculateResources(
        resources,
        missingResources,
        (a, b) => a + b
      );
      takeFromSupply(convertToResourceOnly(resourcesToTake));
      receiveResources(resourcesToTake);
      showToast(ERequestStatus.WARNING, "Not enough resources in supply!");
      return;
    }

    takeFromSupply(convertToResourceOnly(resources));
    receiveResources(resources);
    showToast(ERequestStatus.SUCCESS, "Successfully collected!");
  };

  const getFieldImage = (type: ETerrains) =>
    isGrass ? null : <ReactSVG src={fieldImages[type]!} />;

  const finishCollecting = () => {
    setStatus(EStatus.SELECT_ACTION);
    activateMapFields(EStatus.SELECT_ACTION);
    nextPlayer();
    verifyEndRound(players, round, {
      prepareNextRound: (nextRound, startingWorkers) => {
        cleanupMapWorkers();
        setRound(nextRound);
        preparePlayersToNextRound(startingWorkers, nextRound);
        showToast(ERequestStatus.WARNING, `Round ${nextRound}/4`);
      },
      draw: () => {
        showToast(
          ERequestStatus.WARNING,
          `It looks like there is no winner because more than one player has the same amount of points`
        );
      },
      win: ({ name }) => {
        showToast(
          ERequestStatus.SUCCESS,
          `Game over! The winner is ${name}! Congratulations!`
        );
      },
    });
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
              collectAvailableResources(resource);
              break;
            }

            case ETerrains.POND: {
              const resource: Partial<TResourcesOnly> = { fish: 1 };
              collectAvailableResources(resource);
              break;
            }

            case ETerrains.ROCKS: {
              const resource: Partial<TResourcesOnly> = { stone: 1 };
              collectAvailableResources(resource);
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

                    showToast(
                      ERequestStatus.ERROR,
                      `Not enough resources to pay including the tax for the owner! Require additionally - ${costInfo}`
                    );
                    return;
                  }
                  payToPlayer(cost, buildingOwnerId);
                }

                if (require) {
                  if (!hasEnoughResources(playerResources, require)) {
                    showToast(
                      ERequestStatus.ERROR,
                      "You don't have enough resources!"
                    );
                    return;
                  }
                  payResources(require);
                  restoreToSupply(convertToResourceOnly(require));
                }

                if (benefit) {
                  collectAvailableResources(benefit);
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
