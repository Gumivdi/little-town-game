export const calculateResources = <T extends Record<string, number>>(
  base: T,
  resources: Partial<T>,
  operation: (a: number, b: number) => number
): T => {
  const calculatedResources = { ...base };

  for (const key in resources) {
    const typedKey = key as keyof T;
    calculatedResources[typedKey] = operation(
      base[typedKey] ?? 0,
      resources[typedKey] ?? 0
    ) as T[keyof T];
  }

  return calculatedResources;
};
