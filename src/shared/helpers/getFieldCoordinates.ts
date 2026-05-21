export const getFieldCoordinates = (fieldId: string): number[] => {
  // [row, col, rows, cols]
  const coordinates = fieldId.split("-").map((item) => +item);
  return coordinates;
};
