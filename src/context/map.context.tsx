import { FC, ReactNode, Reducer, createContext, useReducer } from "react";
import { EStatus } from "@/shared/enums/status.enum";
import { ETerrains } from "@/shared/enums/terrains.enum";
import { TField, TMap } from "@/shared/types/map.type";
import { updateMapFields } from "@/shared/helpers/updateMapFields";

type TContext = {
  map: TMap | [];
  initMap: (map: TMap) => void;
  sendWorker: (playerId: number, field: TField) => void;
  build: (field: TField) => void;
  activateMapFields: (status: EStatus, fieldId?: string) => void;
  disableMapField: (fieldId: string) => void;
};

type TReducer = {
  map: TMap;
};

type TReducerActions =
  | { type: "INIT"; payload: TMap }
  | { type: "SEND_WORKER"; payload: { playerId: number; field: TField } }
  | { type: "BUILD"; payload: TField }
  | {
      type: "ACTIVATE_MAP_FIELDS";
      payload: { status: EStatus; fieldId?: string };
    }
  | { type: "DISABLE_MAP_FIELD"; payload: string };

export const MapContext = createContext<TContext>({
  map: [],
  initMap: () => {},
  sendWorker: () => {},
  build: () => {},
  activateMapFields: () => {},
  disableMapField: () => {},
});

const reducer: Reducer<TReducer, TReducerActions> = (
  state,
  action
): TReducer => {
  const { type, payload } = action;
  switch (type) {
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
      const updatedMap = [...state.map];
      const { playerId, field } = payload;
      const fieldCoordinates = field.id!.split("-").map((item) => +item);
      const [row, col] = fieldCoordinates;
      const mapField = updatedMap[row][col];

      if (mapField.type === ETerrains.GRASS && mapField.owner === null) {
        mapField.owner = playerId;
      }

      return {
        ...state,
        map: updatedMap,
      };
    }

    case "BUILD":
      return state;

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
        const [row, col, mapRows, mapCols] = fieldId!.split("-");
        const nearbyFields: string[] = [];
        const nearbyRows = [+row - 1, +row, +row + 1];
        const nearbyCols = [+col - 1, +col, +col + 1];
        const avaliableRows = nearbyRows.filter(
          (item) => item > -1 && item < +mapRows
        );
        const avaliableCols = nearbyCols.filter(
          (item) => item > -1 && item < +mapCols
        );

        for (const fieldRow of avaliableRows) {
          for (const fieldCol of avaliableCols) {
            const nearbyFieldId = `${fieldRow}-${fieldCol}-${mapRows}-${mapCols}`;
            if (nearbyFieldId === fieldId) continue;
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

    case "DISABLE_MAP_FIELD": {
      const updatedMap = [...state.map];
      const [row, col] = payload.split("-").map((item) => +item);
      updatedMap[row][col].disabled = true;
      return {
        ...state,
        map: updatedMap,
      };
    }

    default:
      return state;
  }
};

export const MapProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { map: [] });

  const initMap = (map: TMap) => {
    dispatch({ type: "INIT", payload: map });
  };

  const sendWorker = (playerId: number, field: TField) => {
    dispatch({ type: "SEND_WORKER", payload: { playerId, field } });
  };

  const build = (field: TField) => {
    dispatch({ type: "BUILD", payload: field });
  };

  const activateMapFields = (status: EStatus, fieldId?: string) => {
    dispatch({ type: "ACTIVATE_MAP_FIELDS", payload: { status, fieldId } });
  };

  const disableMapField = (fieldId: string) => {
    dispatch({ type: "DISABLE_MAP_FIELD", payload: fieldId });
  };

  const context = {
    map: state.map,
    initMap,
    sendWorker,
    build,
    activateMapFields,
    disableMapField,
  };
  return <MapContext.Provider value={context}>{children}</MapContext.Provider>;
};
