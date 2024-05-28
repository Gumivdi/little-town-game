import { FC, ReactNode, Reducer, createContext, useReducer } from "react";
import { EStatus } from "@/shared/enums/status.enum";
import { ETerrains } from "@/shared/enums/terrains.enum";
import { TField, TMap } from "@/shared/types/map.type";
import { updateMapField } from "@/shared/helpers/updateMapField";
import { updateMapFields } from "@/shared/helpers/updateMapFields";
import { getFieldCoordinates } from "@/shared/helpers/getFieldCoordinates";
import { TBuilding } from "@/shared/types/building.type";
import {
  DSpecialBuildings,
  DWithoutBenefitBuildings,
} from "@/data/buildings.data";

type TContext = {
  map: TMap | [];
  activateMapFields: (status: EStatus, fieldId?: string) => void;
  build: (field: TField, building: TBuilding, playerId: number) => void;
  disableMapField: (fieldId: string) => void;
  initMap: (map: TMap) => void;
  sendWorker: (playerId: number, field: TField) => void;
};

type TReducer = {
  map: TMap;
};

type TReducerActions =
  | {
      type: "ACTIVATE_MAP_FIELDS";
      payload: { status: EStatus; fieldId?: string };
    }
  | {
      type: "BUILD";
      payload: { field: TField; building: TBuilding; playerId: number };
    }
  | { type: "DISABLE_MAP_FIELD"; payload: string }
  | { type: "INIT"; payload: TMap }
  | { type: "SEND_WORKER"; payload: { playerId: number; field: TField } };

export const MapContext = createContext<TContext>({
  map: [],
  activateMapFields: () => {},
  build: () => {},
  disableMapField: () => {},
  initMap: () => {},
  sendWorker: () => {},
});

const reducer: Reducer<TReducer, TReducerActions> = (
  state,
  action
): TReducer => {
  const { type, payload } = action;
  switch (type) {
    case "ACTIVATE_MAP_FIELDS": {
      const { status, fieldId } = payload;

      if (status === EStatus.SELECT_ACTION) {
        return {
          ...state,
          map: updateMapFields(state.map, () => ({
            disabled: true,
          })),
        };
      }

      if (status === EStatus.SEND_WORKER || status === EStatus.BUILD) {
        return {
          ...state,
          map: updateMapFields(state.map, (_, { colItem }) => {
            const isGrass = colItem.type === ETerrains.GRASS;
            const haveOwner = isGrass && !!colItem.owner;
            return {
              disabled: !isGrass || haveOwner,
            };
          }),
        };
      }

      if (status === EStatus.COLLECT) {
        const [row, col, mapRows, mapCols] = getFieldCoordinates(fieldId!);
        const nearbyFields: string[] = [];
        const nearbyRows = [row - 1, row, row + 1];
        const nearbyCols = [col - 1, col, col + 1];
        const avaliableRows = nearbyRows.filter(
          (item) => item > -1 && item < +mapRows
        );
        const avaliableCols = nearbyCols.filter(
          (item) => item > -1 && item < +mapCols
        );

        const isBuildingNameInArray = (field: TField, array: unknown[]) =>
          field.type === ETerrains.GRASS &&
          !!field.building &&
          array.includes(field.building.name);

        for (const fieldRow of avaliableRows) {
          for (const fieldCol of avaliableCols) {
            const nearbyFieldId = `${fieldRow}-${fieldCol}-${mapRows}-${mapCols}`;
            const field = state.map[fieldRow][fieldCol];
            const isCurrentField = nearbyFieldId === fieldId;
            if (
              isCurrentField ||
              isBuildingNameInArray(field, DSpecialBuildings) ||
              isBuildingNameInArray(field, DWithoutBenefitBuildings)
            )
              continue;
            nearbyFields.push(nearbyFieldId);
          }
        }

        return {
          ...state,
          map: updateMapFields(state.map, (_, { colItem }) => {
            const nearbyField = nearbyFields.includes(colItem.id!);
            const isGrass = colItem.type === ETerrains.GRASS;
            return {
              disabled:
                !nearbyField || (nearbyField && isGrass && !colItem.building),
            };
          }),
        };
      }

      return state;
    }

    case "BUILD": {
      const { field, building, playerId } = payload;
      return {
        ...state,
        map: updateMapField(state.map, field.id!, (mapField) => ({
          ...mapField,
          building,
          owner: playerId,
        })),
      };
    }

    case "DISABLE_MAP_FIELD": {
      return {
        ...state,
        map: updateMapField(state.map, payload, (field) => ({
          ...field,
          disabled: true,
        })),
      };
    }

    case "INIT": {
      return {
        ...state,
        map: updateMapFields(payload, ({ rowIndex }, { colIndex }) => {
          const mapRows = payload.length;
          const mapCols = payload[0].length;
          return {
            id: `${rowIndex}-${colIndex}-${mapRows}-${mapCols}`,
            disabled: true,
          };
        }),
      };
    }

    case "SEND_WORKER": {
      const { playerId, field } = payload;
      return {
        ...state,
        map: updateMapField(state.map, field.id!, (fieldToUpdate) => ({
          ...fieldToUpdate,
          owner: playerId,
        })),
      };
    }

    default:
      return state;
  }
};

export const MapProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { map: [] });

  const activateMapFields = (status: EStatus, fieldId?: string) => {
    dispatch({ type: "ACTIVATE_MAP_FIELDS", payload: { status, fieldId } });
  };

  const build = (field: TField, building: TBuilding, playerId: number) => {
    dispatch({ type: "BUILD", payload: { field, building, playerId } });
  };

  const disableMapField = (fieldId: string) => {
    dispatch({ type: "DISABLE_MAP_FIELD", payload: fieldId });
  };

  const initMap = (map: TMap) => {
    dispatch({ type: "INIT", payload: map });
  };

  const sendWorker = (playerId: number, field: TField) => {
    dispatch({ type: "SEND_WORKER", payload: { playerId, field } });
  };

  const context = {
    ...state,
    activateMapFields,
    build,
    disableMapField,
    initMap,
    sendWorker,
  };
  return <MapContext.Provider value={context}>{children}</MapContext.Provider>;
};
