import { EResources } from "@/shared/enums/resources.enum";
import { TResourcesAll } from "@/shared/types/resources.type";

export const convertToResourceOnly = (object: Partial<TResourcesAll>) => {
  const updatedObject = { ...object };
  delete updatedObject[EResources.POINT];
  return updatedObject;
};
