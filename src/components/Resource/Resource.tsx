import { EResources } from "@/shared/enums/resources.enum";
import classNames from "classnames";

type TProps = React.HTMLAttributes<HTMLDivElement> & {
  type: EResources;
  size: number;
};

const Resource: React.FC<TProps> = ({ type, size, children, ...args }) => {
  const resources: Record<EResources, string> = {
    coin: "bg-zinc-500",
    fish: "bg-sky-400",
    point: "bg-amber-600",
    stone: "bg-stone-600",
    wheat: "bg-yellow-500",
    wood: "bg-amber-900",
  };

  const roundedResources = [EResources.COIN, EResources.POINT];
  let elementClass = `size-${size} flex items-center justify-center shadow-[0_0_1px_1px_black] `;
  elementClass += resources[type];

  return (
    <div
      {...args}
      className={classNames(elementClass, {
        "rounded-full": roundedResources.includes(type),
      })}
    >
      {children}
    </div>
  );
};

export default Resource;
