export const calculateResources = <T>(
  base: Record<keyof T, number>,
  resources: Partial<Record<keyof T, number>>,
  operation: (a: number, b: number) => number
) => {
  const calculatedResources = { ...base };
  for (const key in resources) {
    const typedKey = key as keyof T;
    calculatedResources[typedKey] = operation(
      calculatedResources[typedKey],
      resources[typedKey]!
    );
  }
  return calculatedResources;
};
