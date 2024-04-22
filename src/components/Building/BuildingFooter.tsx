import { TFooterProps } from "./Building.type";
import { EResources } from "@/shared/enums/resources.enum";
import ResourceValue from "@/components/Resource/ResourceValue";
import Resource from "@/components/Resource/Resource";
import ResourceMapObject from "@/components/Resource/ResourceMapObject";
import ResourceMap from "@/components/Resource/ResourceMap";

const BuildingFooter: React.FC<TFooterProps> = ({ building, nameKey }) => {
  const { action } = building;
  const require = action?.require;
  const benefit = action?.benefit;

  return (
    <footer className="min-h-9 flex items-center justify-center bg-slate-200 w-full px-2 py-1">
      <div className="flex flex-wrap items-center gap-1">
        {!!require && (
          <>
            <ResourceMapObject
              uniqueKey={nameKey.concat("-require_wrap")}
              object={require}
              fallback={(resource) => (
                <ResourceMap
                  uniqueKey={nameKey.concat(`-require-${resource}`)}
                  counter={require[resource]!}
                >
                  <Resource type={resource} size={4} />
                </ResourceMap>
              )}
            />
            <p className="mx-1 text-xl text-black">&gt;</p>
          </>
        )}

        {!!benefit && (
          <ResourceMapObject
            uniqueKey={nameKey.concat("-benefit_wrap")}
            object={benefit}
            fallback={(resource) => {
              const isPoint = resource === EResources.POINT;
              return isPoint ? (
                <Resource type={resource} size={6}>
                  <ResourceValue value={benefit[resource]!} />
                </Resource>
              ) : (
                <ResourceMap
                  uniqueKey={nameKey.concat(`-benefit-${resource}`)}
                  counter={benefit[resource]!}
                >
                  <Resource type={resource} size={4} />
                </ResourceMap>
              );
            }}
          />
        )}

        {!benefit && !require ? <span>🚫</span> : null}
      </div>
    </footer>
  );
};

export default BuildingFooter;
