import { ETerrains } from "@/shared/enums/terrains.enum";
import { updateMapField } from "@/shared/helpers/map/update-map-field";
import { updateMapFields } from "@/shared/helpers/map/update-map-fields";
import { getCollectableFieldIds } from "@/shared/helpers/map/get-collectable-field-ids";
import { isWorkerOnField } from "@/shared/helpers/map/is-worker-on-field";
import { TMapSliceCreator } from "./map.types";
import { createCollectAction } from "../../actions/map/collect";
import { TGameStore } from "..";
import { createGrabWorkerAction } from "@/store/actions/map/grab-worker";
import { createPlaceWorkerAction } from "@/store/actions/map/place-worker";

export const createMapSlice: TMapSliceCreator<TGameStore> = (set, get) => ({
  map: [],
  memorizedFieldId: null,

  // --- GETTERS ---
  getFieldById: (fieldId) =>
    get()
      .map.flat()
      .find((field) => field.id === fieldId),

  // --- SETTERS ---
  setFieldBuilding: (fieldId, building) =>
    set((state) => ({
      map: updateMapField(state.map, fieldId, (field) => ({
        ...field,
        building,
      })),
    })),

  setFieldOwner: (fieldId, owner) =>
    set((state) => ({
      map: updateMapField(state.map, fieldId, (field) => ({
        ...field,
        owner,
      })),
    })),

  setMap: (map) => set({ map }),
  setMemorizedFieldId: (fieldId) => set({ memorizedFieldId: fieldId }),

  // --- METHODS ---
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

  unsetFieldOwner: (fieldId) => {
    set((state) => ({
      map: updateMapField(state.map, fieldId, (field) => ({
        ...field,
        owner: null,
      })),
    }));
  },

  // --- ACTIONS ---
  collect: createCollectAction({ set, get }),
  grabWorker: createGrabWorkerAction({ set, get }),
  placeWorker: createPlaceWorkerAction({ set, get }),
});
