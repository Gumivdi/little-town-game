import {
  FC,
  ReactNode,
  Reducer,
  createContext,
  useReducer,
  useState,
} from "react";
import { TPlayer } from "@/shared/types/player.type";
import { TResourcesAll } from "@/shared/types/resources.type";

type TContext = {
  currentPlayer: number;
  players: TPlayer[];
  initPlayers: (players: TPlayer[]) => void;
  updatePlayer: (id: number, data: Partial<TPlayer>) => void;
  nextPlayer: () => void;
  payResources: (resources: Partial<TResourcesAll>) => void;
  receiveResources: (resources: Partial<TResourcesAll>) => void;
};

type TReducer = {
  players: TPlayer[];
};

type TReducerActions =
  | { type: "INIT"; payload: TPlayer[] }
  | { type: "UPDATE"; payload: { id: number; player: Partial<TPlayer> } }
  | {
      type: "PAY";
      payload: { playerIndex: number; resources: Partial<TResourcesAll> };
    }
  | {
      type: "RECEIVE";
      payload: { playerIndex: number; resources: Partial<TResourcesAll> };
    };

export const PlayersContext = createContext<TContext>({
  currentPlayer: 0,
  players: [],
  initPlayers: () => {},
  updatePlayer: () => {},
  nextPlayer: () => {},
  payResources: () => {},
  receiveResources: () => {},
});

const reducer: Reducer<TReducer, TReducerActions> = (
  state,
  action
): TReducer => {
  const { type, payload } = action;

  const updatePlayerData = (player: TPlayer, newData: Partial<TPlayer>) => ({
    ...player,
    ...newData,
    resources: {
      ...player.resources,
      ...newData.resources,
    },
  });

  const updateResources = (
    player: TPlayer,
    resources: Partial<TResourcesAll>,
    operation: (a: number, b: number) => number
  ) => {
    const playerResources = { ...player.resources };
    for (const key in resources) {
      const typedKey = key as keyof TResourcesAll;
      playerResources[typedKey] = operation(
        playerResources[typedKey]!,
        resources[typedKey]!
      );
    }
    return playerResources;
  };

  switch (type) {
    case "INIT": {
      return {
        ...state,
        players: payload,
      };
    }

    case "UPDATE": {
      const playersState = [...state.players];
      return {
        ...state,
        players: playersState.map((player) =>
          player.id === payload.id
            ? updatePlayerData(player, payload.player)
            : player
        ),
      };
    }

    case "PAY": {
      const { playerIndex, resources } = payload;

      const players = [...state.players];
      const player = players[playerIndex];

      players[playerIndex] = {
        ...player,
        resources: {
          ...updateResources(player, resources, (a, b) => a - b),
        },
      };

      return {
        ...state,
        players,
      };
    }

    case "RECEIVE": {
      const { playerIndex, resources } = payload;

      const players = [...state.players];
      const player = players[playerIndex];

      players[playerIndex] = {
        ...player,
        resources: {
          ...updateResources(player, resources, (a, b) => a + b),
        },
      };

      return {
        ...state,
        players,
      };
    }

    default:
      return state;
  }
};

export const PlayersProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { players: [] });
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const initPlayers = (players: TPlayer[]) => {
    dispatch({ type: "INIT", payload: players });
  };

  const updatePlayer = (id: number, player: Partial<TPlayer>) => {
    dispatch({ type: "UPDATE", payload: { id, player } });
  };

  const payResources = (resources: Partial<TResourcesAll>) => {
    dispatch({
      type: "PAY",
      payload: { playerIndex: currentPlayer, resources },
    });
  };

  const receiveResources = (resources: Partial<TResourcesAll>) => {
    dispatch({
      type: "RECEIVE",
      payload: { playerIndex: currentPlayer, resources },
    });
  };

  const nextPlayer = () => {
    const isLastPlayer = currentPlayer === state.players.length - 1;
    setCurrentPlayer(isLastPlayer ? 0 : currentPlayer + 1);
  };

  const context = {
    currentPlayer: currentPlayer,
    players: state.players,
    initPlayers,
    updatePlayer,
    nextPlayer,
    payResources,
    receiveResources,
  };

  return (
    <PlayersContext.Provider value={context}>
      {children}
    </PlayersContext.Provider>
  );
};
