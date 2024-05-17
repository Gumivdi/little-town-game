import { TField, TMap } from "@/shared/types/map.type";

export const updateMapField = (
  map: TMap,
  fieldId: string,
  update: (field: TField) => TField
): TMap => {
  const updatedMap = [...map];
  const [row, col] = fieldId.split("-").map((item) => +item);
  updatedMap[row][col] = update(updatedMap[row][col]);
  return updatedMap;
};
