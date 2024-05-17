import { FC, ReactNode, Reducer, createContext, useReducer } from "react";
import { TResourcesOnly } from "@/shared/types/resources.type";
import { calculateResources } from "@/shared/helpers/calculateResources";

type TContext = {
  supply: TResourcesOnly;
  restoreToSupply: (resources: Partial<TResourcesOnly>) => void;
  takeFromSupply: (resources: Partial<TResourcesOnly>) => void;
};

type TReducerActions =
  | { type: "RESTORE"; payload: Partial<TResourcesOnly> }
  | { type: "TAKE"; payload: Partial<TResourcesOnly> };

export const SupplyContext = createContext<TContext>({
  supply: {
    stone: 0,
    wood: 0,
    wheat: 0,
    fish: 0,
    coin: 0,
  },
  restoreToSupply: () => {},
  takeFromSupply: () => {},
});

const reducer: Reducer<TResourcesOnly, TReducerActions> = (
  state,
  action
): TResourcesOnly => {
  const { type, payload } = action;

  switch (type) {
    case "RESTORE":
      return {
        ...calculateResources(state, payload, (a, b) => a + b),
      };

    case "TAKE":
      return {
        ...calculateResources(state, payload, (a, b) => a - b),
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

  const restoreToSupply = (resources: Partial<TResourcesOnly>) => {
    dispatch({ type: "RESTORE", payload: resources });
  };

  const takeFromSupply = (resources: Partial<TResourcesOnly>) => {
    dispatch({ type: "TAKE", payload: resources });
  };

  const context = {
    supply: state,
    restoreToSupply,
    takeFromSupply,
  };

  return (
    <SupplyContext.Provider value={context}>{children}</SupplyContext.Provider>
  );
};
