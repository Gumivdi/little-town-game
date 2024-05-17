import { TField, TMap } from "@/shared/types/map.type";

export const updateMapFields = (
  map: TMap,
  update: (
    row: {
      rowItem: TField[];
      rowIndex: number;
    },
    col: {
      colItem: TField;
      colIndex: number;
    }
  ) => Partial<TField>
): TMap => {
  const mapCopy = [...map];
  return mapCopy.map((row, rowIndex) =>
    row.map((field, fieldIndex) =>
      Object.assign(
        {},
        field,
        update(
          { rowItem: row, rowIndex: rowIndex },
          { colItem: field, colIndex: fieldIndex }
        )
      )
    )
  );
};
