import { EResources } from "@/shared/enums/resources.enum";
import { ETerrains } from "@/shared/enums/terrains.enum";
import { TResourcesOnly } from "@/shared/types/resources.type";

export const getResourceName: (type: ETerrains) => keyof TResourcesOnly = (
  type,
) => {
  switch (type) {
    case ETerrains.FORREST:
      return EResources.WOOD;
    case ETerrains.POND:
      return EResources.FISH;
    case ETerrains.ROCKS:
      return EResources.STONE;
    default:
      throw new Error(`Field of type ${type} is not a resource field`);
  }
};
