import { THeaderProps } from "./Building.type";
import { EResources } from "@/shared/enums/resources.enum";
import ResourceValue from "@/components/Resource/ResourceValue";
import Resource from "@/components/Resource/Resource";
import ResourceMapObject from "@/components/Resource/ResourceMapObject";

const BuildingHeader: React.FC<THeaderProps> = ({ building, costKey }) => {
  const { point, cost } = building;

  return (
    <header className="w-full flex items-center justify-between">
      <div className="flex gap-2">
        <ResourceMapObject
          uniqueKey={costKey}
          object={cost}
          fallback={(resourceKey) => (
            <Resource type={resourceKey} size={6}>
              <ResourceValue value={cost[resourceKey]!} />
            </Resource>
          )}
        />
      </div>
      <Resource type={EResources.POINT} size={6}>
        <ResourceValue value={point} />
      </Resource>
    </header>
  );
};

export default BuildingHeader;
