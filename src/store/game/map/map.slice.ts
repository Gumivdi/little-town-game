import { ETerrains } from "@/shared/enums/terrains.enum";
import { updateMapField } from "@/shared/helpers/map/update-map-field";
import { updateMapFields } from "@/shared/helpers/map/update-map-fields";
import { getCollectableFieldIds } from "@/shared/helpers/map/get-collectable-field-ids";
import { IMapSlice, TMapSliceCreator } from "./map.types";
import { isWorkerOnField } from "@/shared/helpers/map/is-worker-on-field";

export const createMapSlice: TMapSliceCreator<IMapSlice> = (set, get) => ({
  map: [],
  memorizedFieldId: null,

  clearOwnersOnEmptyGrass: () => {
    set((state) => ({
      map: updateMapFields(state.map, (_, { colItem }) =>
        isWorkerOnField(colItem) ? { owner: null } : colItem,
      ),
    }));
  },

  disableField: (fieldId) => {
    set((state) => ({
      map: updateMapField(state.map, fieldId, (field) => ({
        ...field,
        disabled: true,
      })),
    }));
  },

  disableFields: () => {
    set((state) => ({
      map: updateMapFields(state.map, () => ({ disabled: true })),
    }));
  },

  enableCollectableFields: (fieldId) => {
    set((state) => {
      const collectableIDs = getCollectableFieldIds(state.map, fieldId);

      return {
        map: updateMapFields(state.map, (_, { colItem }) => ({
          disabled: !collectableIDs.includes(colItem.id!),
        })),
      };
    });
  },

  enableEmptyGrassFields: () => {
    set((state) => ({
      map: updateMapFields(state.map, (_, { colItem }) => ({
        disabled: !(colItem.type === ETerrains.GRASS && !colItem.owner),
      })),
    }));
  },

  enableField: (fieldId) => {
    set((state) => ({
      map: updateMapField(state.map, fieldId, (field) => ({
        ...field,
        disabled: false,
      })),
    }));
  },

  setFieldBuilding: (fieldId, building) => {
    set((state) => ({
      map: updateMapField(state.map, fieldId, (field) => ({
        ...field,
        building,
      })),
    }));
  },

  setFieldOwner: (fieldId, owner) => {
    set((state) => ({
      map: updateMapField(state.map, fieldId, (field) => ({
        ...field,
        owner,
      })),
    }));
  },

  setMap: (map) => {
    set({ map });
  },

  setMemorizedFieldId: (fieldId) => {
    set({ memorizedFieldId: fieldId });
  },

  unsetFieldOwner: (fieldId) => {
    set((state) => ({
      map: updateMapField(state.map, fieldId, (field) => ({
        ...field,
        owner: null,
      })),
    }));
  },
});
