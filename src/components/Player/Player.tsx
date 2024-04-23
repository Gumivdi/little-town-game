import classNames from "classnames";
import { ReactSVG } from "react-svg";

import { TPlayer } from "@/shared/types/player.type";
import { EResources } from "@/shared/enums/resources.enum";
import Resource from "@/components/Resource/Resource";
import ResourceValue from "@/components/Resource/ResourceValue";

import ImgWorker from "@/assets/user.svg";
import ImgBuilding from "@/assets/home.svg";

type TProps = {
  data: TPlayer;
};

const Player: React.FC<TProps> = ({ data }) => {
  const { id, name, resources, workers, buildings, color } = data;
  const resourceEntries = Object.entries(resources) as [EResources, number][];

  return (
    <li
      className={classNames(
        "flex justify-between items-center p-2 bg-black/70 border-l-8 border-soli",
        `border-${color}-600`
      )}
    >
      <div>
        <h3>{name}</h3>
        <ul className="flex gap-2">
          <li className="flex items-center gap-1">
            <ReactSVG className="size-4" color="white" src={ImgWorker} />
            <p>{workers}</p>
          </li>
          <li className="flex items-center gap-1">
            <ReactSVG className="size-4" color="white" src={ImgBuilding} />
            <p>{buildings}</p>
          </li>
        </ul>
      </div>

      <ul className="flex gap-2">
        {resourceEntries.map((item) => {
          const [resource, quantity] = item;
          const resourceKey = name.concat(`-${id}-${resource}`);

          return (
            <li key={resourceKey}>
              <Resource size={6} type={resource}>
                <ResourceValue value={quantity} />
              </Resource>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default Player;
