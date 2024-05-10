import { DSetup } from "@/data/setup.data";
import { EResources } from "@/shared/enums/resources.enum";
import { TResourcesAll } from "@/shared/types/resources.type";

export const setupResources = (
  numberOfPlayers: number
): Partial<TResourcesAll> => {
  const setupResources = { ...DSetup[numberOfPlayers - 2].resources };
  for (const key in setupResources) {
    const typedKey = key as EResources;
    setupResources[typedKey]! *= numberOfPlayers;
  }
  return setupResources;
};
