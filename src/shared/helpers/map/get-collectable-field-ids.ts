import { ETerrains } from "@/shared/enums/terrains.enum";
import { TFieldID, TMap } from "@/shared/types/map.type";
import {
  DSpecialBuildings,
  DWithoutBenefitBuildings,
} from "@/data/buildings.data";
import { getFieldCoordinates } from "./get-field-coordinates";
import { getNeighbourCoordinates } from "./get-neighbour-coordinates";
import { isBuildingNameInArray } from "./is-building-name-in-array";
import { getFieldId } from "./get-field-id";

export const getCollectableFieldIds = (map: TMap, fieldId: TFieldID) => {
  const { rows, cols } = getFieldCoordinates(fieldId);
  const neighbourCoordinates = getNeighbourCoordinates(fieldId);

  const collectableFields = neighbourCoordinates
    .filter(({ row: currentRow, col: currentCol }) => {
      const field = map[currentRow][currentCol];

      const isSpecial =
        isBuildingNameInArray(field, DSpecialBuildings) ||
        isBuildingNameInArray(field, DWithoutBenefitBuildings);

      const isGrassWithoutBuilding =
        field.type === ETerrains.GRASS && !field.building;

      return !isSpecial && !isGrassWithoutBuilding;
    })
    .map(({ row: currentRow, col: currentCol }) =>
      getFieldId(currentRow, currentCol, rows, cols),
    );

  return collectableFields;
};
