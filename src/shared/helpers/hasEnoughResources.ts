import { EResources } from "@/shared/enums/resources.enum";
import { TResourcesAll } from "@/shared/types/resources.type";

export const hasEnoughResources = (
  playerResources: TResourcesAll,
  cost: Partial<TResourcesAll>
) => {
  for (const resource in cost) {
    const resourceKey = resource as EResources;
    if (playerResources[resourceKey] < cost[resourceKey]!) {
      return false;
    }
  }
  return true;
};
