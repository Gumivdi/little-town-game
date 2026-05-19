import { IPlayersSlice, TPlayersSliceCreator } from "./players.types";

export const createPlayersSlice: TPlayersSliceCreator<IPlayersSlice> = (
  set,
  get,
) => ({
  players: [],
  currentPlayerIndex: 0,

  _decreasePlayerComponents: (component) => {
    set((state) => ({
      players: state.players.map((player, index) =>
        index === state.currentPlayerIndex
          ? {
              ...player,
              [component]: player[component] - 1,
            }
          : player,
      ),
    }));
  },

  decrementPlayerBuildings: () => {
    get()._decreasePlayerComponents("buildings");
  },

  decrementPlayerWorkers: () => {
    get()._decreasePlayerComponents("workers");
  },

  setNextPlayer: () => {
    set((state) => {
      const isLastPlayer =
        state.currentPlayerIndex === state.players.length - 1;
      const nextPlayer = isLastPlayer ? 0 : state.currentPlayerIndex + 1;
      return { currentPlayerIndex: nextPlayer };
    });
  },

  updatePlayerResources: (id, data) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id
          ? {
              ...player,
              resources: {
                ...player.resources,
                ...data,
              },
            }
          : player,
      ),
    }));
  },
});
