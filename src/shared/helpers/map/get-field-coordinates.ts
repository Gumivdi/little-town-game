import { TFieldCoordinates } from "@/shared/types/map.type";

export const getFieldCoordinates = (fieldId: string): TFieldCoordinates => {
  const [row, col, rows, cols] = fieldId.split("-").map(Number);
  return { row, col, rows, cols };
};
