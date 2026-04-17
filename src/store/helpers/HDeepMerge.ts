import { TDeepParial } from "../game/players/players.types";

export const HDeepMerge = <T>(target: T, data: TDeepParial<T>) => {
  const result: any = { ...target };

  for (const key in data) {
    const value = data[key];

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      result[key] = HDeepMerge(result[key], value as any);
    } else {
      result[key] = value;
    }
  }

  return result;
}