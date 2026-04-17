import { ETerrains } from "@/shared/enums/terrains.enum";
import { updateMapFields } from "@/shared/helpers/updateMapFields";
import { IMapSlice, TMapSliceCreator } from "./map.types";

export const createMapSlice: TMapSliceCreator<IMapSlice> = (set, get) => ({
  map: [],

  activateFreeGrass: () => {
    const updatedMap = get().map.map((row) => row.map((field) => {
      if (field.type === ETerrains.GRASS && !field.owner) {
        return { ...field, disabled: false };
      }
      return { ...field, disabled: true };
    }))
    set({ map: updatedMap });
  },
  
  activateNeighboursForCollect: (fieldID) => {
    const updatedMap = get().map.map((row) => row.map((field) => {
      if (field.id === fieldID) return field;
      const [fieldRow, fieldCol] = fieldID.split("-").map((item) => +item);
      const [currentRow, currentCol] = field.id!.split("-").map((item) => +item);
      const isNearby = Math.abs(fieldRow - currentRow) <= 1 && Math.abs(fieldCol - currentCol) <= 1;
      const isGrass = field.type === ETerrains.GRASS;
      const haveBuilding = isGrass && field.building;
      return { ...field, disabled: !isNearby || (isNearby && isGrass && !haveBuilding) };
    }))
    set({ map: updatedMap });
  },

  cleanupWorkers: () => {
      const updatedMap = get().map.map((row) => row.map((field) => {
        const isGrass = field.type === ETerrains.GRASS;
        const haveOwner = isGrass && !!field.owner;
        const haveNotBuilding = haveOwner && !field.building;
        return isGrass && haveOwner && haveNotBuilding
            ? { ...field, owner: null }
            : field;
      }))
      set({ map: updatedMap });
  },

  disableField: (fieldID) => {
    const updatedMap = get().map.map((row) => row.map((field) => field.id === fieldID ? { ...field, disabled: true } : field))
    set({ map: updatedMap });
  },

  disableFields: () => {
    const updatedMap = get().map.map((row) => row.map((field) => ({ ...field, disabled: true })));
    set({ map: updatedMap });
  },

  init: (map) => {
    const updatedMap = updateMapFields(map, ({ rowIndex }, { colIndex }) => {
      const mapRows = map.length;
      const mapCols = map[0].length;
      return {
        id: `${rowIndex}-${colIndex}-${mapRows}-${mapCols}`,
        disabled: true,
      };
    });
    set({ map: updatedMap });
  }
});