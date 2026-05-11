import { updateMapField } from "@/shared/helpers/map/updateMapField";
import { IMapSlice, TMapSliceCreator } from "./map.types";

export const createMapSlice: TMapSliceCreator<IMapSlice> = (set, get) => ({
  map: [],

  disableField: (fieldID) => {
    const updatedMap = updateMapField(get().map, fieldID, (field) => ({
      ...field,
      disabled: true,
    }));
    set({ map: updatedMap });
  },

  enableField: (fieldID) => {
    const updatedMap = updateMapField(get().map, fieldID, (field) => ({
      ...field,
      disabled: false,
    }));
    set({ map: updatedMap });
  },

  setFieldOwner: (fieldID, owner) => {
    const updatedMap = updateMapField(get().map, fieldID, (field) => ({
      ...field,
      owner,
    }));
    set({ map: updatedMap });
  },

  unsetFieldOwner: (fieldID) => {
    const updatedMap = updateMapField(get().map, fieldID, (field) => ({
      ...field,
      owner: null,
    }));
    set({ map: updatedMap });
  },

  setFieldBuilding: (fieldID, building) => {
    const updatedMap = updateMapField(get().map, fieldID, (field) => ({
      ...field,
      building,
    }));
    set({ map: updatedMap });
  },
});
