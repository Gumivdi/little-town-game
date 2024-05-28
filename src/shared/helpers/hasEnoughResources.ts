export const hasEnoughResources = <T>(primary: T, secondary: Partial<T>) => {
  for (const resource in secondary) {
    const resourceKey = resource as keyof T;
    if (primary[resourceKey] < secondary[resourceKey]!) {
      return false;
    }
  }
  return true;
};
