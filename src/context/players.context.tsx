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

type TContext = {
  currentPlayer: number;
  players: TPlayer[];
  initPlayers: (players: TPlayer[]) => void;
  nextPlayer: () => void;
  payResources: (resources: Partial<TResourcesAll>) => void;
  receiveResources: (resources: Partial<TResourcesAll>) => void;
  updatePlayer: (id: number, data: Partial<TPlayer>) => void;
};

type TReducer = {
  players: TPlayer[];
};

type TReducerActions =
  | { type: "INIT"; payload: TPlayer[] }
  | {
      type: "PAY";
      payload: { playerIndex: number; resources: Partial<TResourcesAll> };
    }
  | {
      type: "RECEIVE";
      payload: { playerIndex: number; resources: Partial<TResourcesAll> };
    }
  | { type: "UPDATE"; payload: { id: number; player: Partial<TPlayer> } };

export const PlayersContext = createContext<TContext>({
  currentPlayer: 0,
  players: [],
  initPlayers: () => {},
  nextPlayer: () => {},
  payResources: () => {},
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
      const { playerIndex, resources } = payload;

      const players = [...state.players];
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
      const { playerIndex, resources } = payload;

      const players = [...state.players];
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
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const initPlayers = (players: TPlayer[]) => {
    dispatch({ type: "INIT", payload: players });
  };

  const nextPlayer = () => {
    const isLastPlayer = currentPlayer === state.players.length - 1;
    setCurrentPlayer(isLastPlayer ? 0 : currentPlayer + 1);
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

  const updatePlayer = (id: number, player: Partial<TPlayer>) => {
    dispatch({ type: "UPDATE", payload: { id, player } });
  };

  const context = {
    currentPlayer: currentPlayer,
    players: state.players,
    initPlayers,
    nextPlayer,
    payResources,
    receiveResources,
    updatePlayer,
  };

  return (
    <PlayersContext.Provider value={context}>
      {children}
    </PlayersContext.Provider>
  );
};
