import { getFieldCoordinates } from "./get-field-coordinates";

export const getNeighbourCoordinates = (fieldId: string) => {
  const { row, col, rows, cols } = getFieldCoordinates(fieldId);
  const coordinates = [];

  for (let currentRow = row - 1; currentRow <= row + 1; currentRow++) {
    for (let currentCol = col - 1; currentCol <= col + 1; currentCol++) {
      const isOutOfBounds =
        currentRow < 0 ||
        currentCol < 0 ||
        currentRow >= rows ||
        currentCol >= cols;
      const isSelf = currentRow === row && currentCol === col;

      if (isOutOfBounds || isSelf) continue;

      coordinates.push({ row: currentRow, col: currentCol });
    }
  }

  return coordinates;
};
