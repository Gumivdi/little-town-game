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
  const { takeFromSupply } = useContext(SupplyContext);
  const { status, setStatus } = useContext(StatusContext);
  const { map, sendWorker, activateMapFields, disableMapField } =
    useContext(MapContext);
  const { players, currentPlayer, receiveResources, updatePlayer, nextPlayer } =
    useContext(PlayersContext);
  const isGrass = field.type === ETerrains.GRASS;

  const getFieldImage = (type: ETerrains) =>
    isGrass ? null : <ReactSVG src={fieldImages[type]!} />;

  const placeWorker = () => {
    const player = players[currentPlayer];
    sendWorker(player.id, field);
    updatePlayer(player.id, { workers: player.workers - 1 });
    activateMapFields(EStatus.COLLECT, field.id);
    setStatus(EStatus.COLLECT);
  };

  const finishCollecting = () => {
    setStatus(EStatus.SELECT_ACTION);
    activateMapFields(EStatus.SELECT_ACTION);
    nextPlayer();
  };

  const actionHandler = () => {
    const isSomethingToCollect =
      map.flat().filter((item) => !item.disabled).length - 1;

    switch (status) {
      case EStatus.SEND_WORKER:
        placeWorker();
        break;

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
      {isGrass && !!field.owner && (
        <ReactSVG
          className={`size-8 text-${
            players[field.owner - 1].color
          }-600 mx-auto`}
          src={ImgWorker}
        />
      )}
      {getFieldImage(field.type)}
    </button>
  );
};

export default MapField;
