export const getFieldCoordinates = (fieldId: string): number[] => {
  // [column, row, mapColumns, mapRows]
  const coordinates = fieldId.split("-").map((item) => +item);
  return coordinates;
};
