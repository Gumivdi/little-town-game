import { FC, ReactNode, Reducer, createContext, useReducer } from "react";

import { DBuildings, DBuildingsRecommended } from "@/data/buildings.data";
import { TBuilding } from "@/shared/types/building.type";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { TPlayer } from "@/shared/types/player.type";
import { EResources } from "@/shared/enums/resources.enum";

type TContext = {
  buildings: TBuilding[];
  availableBuildings: EBuildings[];
  initBuildings: () => void;
  initRecommended: () => void;
  removeBuilding: (name: EBuildings) => void;
  setAvailableBuildings: (player: TPlayer) => void;
};

type TReducer = {
  buildings: TBuilding[];
  availableBuildings: EBuildings[];
};

type TReducerActions =
  | { type: "INIT"; payload: null }
  | { type: "INIT_RECOMMENDED"; payload: null }
  | { type: "REMOVE"; payload: EBuildings }
  | { type: "SET_AVAILABLE_BUILDINGS"; payload: TPlayer };

export const BuildingsContext = createContext<TContext>({
  buildings: [],
  availableBuildings: [],
  initBuildings: () => {},
  initRecommended: () => {},
  removeBuilding: () => {},
  setAvailableBuildings: () => {},
});

const reducer: Reducer<TReducer, TReducerActions> = (
  state,
  action
): TReducer => {
  const { type, payload } = action;

  switch (type) {
    case "INIT": {
      const buildingsLimit = 12;

      const randomizeBuildings = (buildings: TBuilding[], size: number) => {
        const selectedElements: Set<TBuilding> = new Set();
        while (selectedElements.size < size) {
          const randomIndex = Math.floor(Math.random() * buildings.length);
          const element = buildings[randomIndex];
          if (!selectedElements.has(element)) {
            selectedElements.add(element);
          }
        }
        return Array.from(selectedElements);
      };

      return {
        ...state,
        buildings: randomizeBuildings(DBuildings, buildingsLimit),
      };
    }

    case "INIT_RECOMMENDED": {
      return {
        ...state,
        buildings: DBuildings.filter((building) =>
          DBuildingsRecommended.includes(building.name)
        ),
      };
    }

    case "REMOVE": {
      const filteredMarket = [...state.buildings].filter(
        (building) => building.name !== payload
      );
      return {
        ...state,
        buildings: filteredMarket,
      };
    }

    case "SET_AVAILABLE_BUILDINGS": {
      const availableBuildingsName = [...state.buildings]
        .filter((building) => {
          const buildingCost = building.cost;
          for (const key in buildingCost) {
            const typedKey = key as EResources;
            const playerResources = payload.resources;
            if (buildingCost[typedKey]! > playerResources[typedKey]) {
              return false;
            }
          }
          return true;
        })
        .map((item) => item.name);

      return {
        ...state,
        availableBuildings: availableBuildingsName,
      };
    }

    default:
      return state;
  }
};

export const BuildingsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    buildings: [],
    availableBuildings: [],
  });

  const initBuildings = () => {
    dispatch({ type: "INIT", payload: null });
  };

  const initRecommended = () => {
    dispatch({ type: "INIT_RECOMMENDED", payload: null });
  };

  const removeBuilding = (name: EBuildings) => {
    dispatch({ type: "REMOVE", payload: name });
  };

  const setAvailableBuildings = (player: TPlayer) => {
    dispatch({ type: "SET_AVAILABLE_BUILDINGS", payload: player });
  };

  const context = {
    ...state,
    initBuildings,
    initRecommended,
    removeBuilding,
    setAvailableBuildings,
  };

  return (
    <BuildingsContext.Provider value={context}>
      {children}
    </BuildingsContext.Provider>
  );
};
