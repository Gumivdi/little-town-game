import { TResourcesOnly } from "@/shared/types/resources.type";

export const getAvailableResourcesFromSupply = (
  benefit: Partial<TResourcesOnly>,
  supplies: TResourcesOnly,
): Partial<TResourcesOnly> => {
  const result: Partial<TResourcesOnly> = {};

  for (const resource in benefit) {
    const key = resource as keyof TResourcesOnly;
    const requested = benefit[key] ?? 0;
    const available = supplies[key] ?? 0;

    result[key] = Math.min(requested, available);
  }

  return result;
};
