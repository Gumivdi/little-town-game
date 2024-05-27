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
import { calculateResources } from "@/shared/helpers/calculateResources";
import { DDefaultPlayer } from "@/data/players.data";

type TContext = {
  currentPlayer: TPlayer;
  players: TPlayer[];
  initPlayers: (players: TPlayer[]) => void;
  nextPlayer: () => void;
  payResources: (resources: Partial<TResourcesAll>, playerId?: number) => void;
  payToPlayer: (resources: Partial<TResourcesAll>, playerId: number) => void;
  receiveResources: (
    resources: Partial<TResourcesAll>,
    playerId?: number
  ) => void;
  updatePlayer: (id: number, data: Partial<TPlayer>) => void;
};

type TReducer = {
  players: TPlayer[];
};

type TReducerActions =
  | { type: "INIT"; payload: TPlayer[] }
  | {
      type: "PAY";
      payload: { playerId: number; resources: Partial<TResourcesAll> };
    }
  | {
      type: "RECEIVE";
      payload: { playerId: number; resources: Partial<TResourcesAll> };
    }
  | { type: "UPDATE"; payload: { id: number; player: Partial<TPlayer> } };

export const PlayersContext = createContext<TContext>({
  currentPlayer: DDefaultPlayer,
  players: [],
  initPlayers: () => {},
  nextPlayer: () => {},
  payResources: () => {},
  payToPlayer: () => {},
  receiveResources: () => {},
  updatePlayer: () => {},
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

  switch (type) {
    case "INIT": {
      return {
        ...state,
        players: payload,
      };
    }

    case "PAY": {
      const { playerId, resources } = payload;

      const players = [...state.players];
      const playerIndex = players.findIndex((player) => player.id === playerId);
      const player = players[playerIndex];

      players[playerIndex] = {
        ...player,
        resources: {
          ...calculateResources(player.resources, resources, (a, b) => a - b),
        },
      };

      return {
        ...state,
        players,
      };
    }

    case "RECEIVE": {
      const { playerId, resources } = payload;

      const players = [...state.players];
      const playerIndex = players.findIndex((player) => player.id === playerId);
      const player = players[playerIndex];

      players[playerIndex] = {
        ...player,
        resources: {
          ...calculateResources(player.resources, resources, (a, b) => a + b),
        },
      };

      return {
        ...state,
        players,
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

    default:
      return state;
  }
};

export const PlayersProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { players: [] });
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const currentPlayer = state.players[currentPlayerIndex] || DDefaultPlayer;

  const initPlayers = (players: TPlayer[]) => {
    dispatch({ type: "INIT", payload: players });
  };

  const nextPlayer = () => {
    const isLastPlayer = currentPlayerIndex === state.players.length - 1;
    setCurrentPlayerIndex(isLastPlayer ? 0 : currentPlayerIndex + 1);
  };

  const payResources = (
    resources: Partial<TResourcesAll>,
    playerId = currentPlayer.id
  ) => {
    dispatch({
      type: "PAY",
      payload: { playerId, resources },
    });
  };

  const receiveResources = (
    resources: Partial<TResourcesAll>,
    playerId = currentPlayer.id
  ) => {
    dispatch({
      type: "RECEIVE",
      payload: { playerId, resources },
    });
  };

  const updatePlayer = (id: number, player: Partial<TPlayer>) => {
    dispatch({ type: "UPDATE", payload: { id, player } });
  };

  const payToPlayer = (resources: Partial<TResourcesAll>, playerId: number) => {
    dispatch({
      type: "PAY",
      payload: { playerId: currentPlayer.id, resources },
    });
    dispatch({
      type: "RECEIVE",
      payload: { playerId, resources },
    });
  };

  const context = {
    ...state,
    currentPlayer,
    initPlayers,
    nextPlayer,
    payResources,
    payToPlayer,
    receiveResources,
    updatePlayer,
  };

  return (
    <PlayersContext.Provider value={context}>
      {children}
    </PlayersContext.Provider>
  );
};
