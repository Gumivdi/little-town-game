import { TFooterProps } from "./Building.type";
import { EResources } from "@/shared/enums/resources.enum";
import ResourceValue from "@/components/Resource/ResourceValue";
import Resource from "@/components/Resource/Resource";
import ResourceMapObject from "@/components/Resource/ResourceMapObject";
import ResourceMap from "@/components/Resource/ResourceMap";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { isObjectEmpty } from "@/shared/helpers/isObjectEmpty";

const BuildingFooter: React.FC<TFooterProps> = ({ building, nameKey }) => {
  const { action, name } = building;
  const require = action?.require;
  const benefit = action?.benefit;

  return (
    <footer className="min-h-9 flex items-center justify-center bg-slate-200 w-full px-2 py-1">
      <div className="flex flex-wrap items-center gap-1">
        {(require && !isObjectEmpty(require)) && (
          <>
            <ResourceMapObject
              uniqueKey={nameKey.concat(`-${building.quantity}`, "-require_wrap")}
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
            <p className="mx-1 text-xs text-black">&gt;</p>
          </>
        )}

        {(benefit && !isObjectEmpty(benefit)) && (
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
        
        {name === EBuildings.LOMBARD && 
          Array.from({ length: 5 }).map((_, i) => {
            const uniqueKey = nameKey.concat(`-lombard-${i}`);
            if (i == 2) return <p key={uniqueKey} className="mx-1 text-xs text-black">&gt;</p>
            return (
            <Resource key={uniqueKey} type={EResources.UNKNOWN} size={4}>
              ?
            </Resource>
          )
          })
        }
      </div>
    </footer>
  );
};

export default BuildingFooter;
