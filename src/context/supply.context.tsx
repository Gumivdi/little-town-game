import { FC, ReactNode, Reducer, createContext, useReducer } from "react";
import { TResourcesOnly } from "@/shared/types/resources.type";
import { calculateResources } from "@/shared/helpers/calculateResources";

type TContext = {
  supply: TResourcesOnly;
  takeFromSupply: (resources: Partial<TResourcesOnly>) => void;
  restoreToSupply: (resources: Partial<TResourcesOnly>) => void;
};

type TReducerActions =
  | { type: "TAKE"; payload: Partial<TResourcesOnly> }
  | { type: "RESTORE"; payload: Partial<TResourcesOnly> };

export const SupplyContext = createContext<TContext>({
  supply: {
    stone: 0,
    wood: 0,
    wheat: 0,
    fish: 0,
    coin: 0,
  },
  takeFromSupply: () => {},
  restoreToSupply: () => {},
});

const reducer: Reducer<TResourcesOnly, TReducerActions> = (
  state,
  action
): TResourcesOnly => {
  const { type, payload } = action;

  switch (type) {
    case "TAKE":
      return {
        ...calculateResources(state, payload, (a, b) => a - b),
      };

    case "RESTORE":
      return {
        ...calculateResources(state, payload, (a, b) => a + b),
      };

    default:
      return state;
  }
};

export const SupplyProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    stone: 15,
    wood: 15,
    wheat: 15,
    fish: 15,
    coin: 40,
  });

  const takeFromSupply = (resources: Partial<TResourcesOnly>) => {
    dispatch({ type: "TAKE", payload: resources });
  };

  const restoreToSupply = (resources: Partial<TResourcesOnly>) => {
    dispatch({ type: "RESTORE", payload: resources });
  };

  const context = {
    supply: state,
    takeFromSupply,
    restoreToSupply,
  };

  return (
    <SupplyContext.Provider value={context}>{children}</SupplyContext.Provider>
  );
};
