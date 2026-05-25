import { IPlayersSlice, TPlayersSliceCreator } from "./players.types";

export const createPlayersSlice: TPlayersSliceCreator<IPlayersSlice> = (
  set,
  get,
) => ({
  currentPlayerIndex: 0,
  players: [],

  // --- GETTERS ---
  getPlayerResources: () => {
    const { players, currentPlayerIndex } = get();
    return players[currentPlayerIndex].resources;
  },

  // --- SETTERS ---
  setNextPlayer: () => {
    set((state) => {
      const isLastPlayer =
        state.currentPlayerIndex === state.players.length - 1;
      const nextPlayer = isLastPlayer ? 0 : state.currentPlayerIndex + 1;
      return { currentPlayerIndex: nextPlayer };
    });
  },

  setPlayerResources: (id, resources) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id
          ? {
              ...player,
              resources: {
                ...player.resources,
                ...resources,
              },
            }
          : player,
      ),
    }));
  },

  // --- METHODS ---
  decrementPlayerBuildings: () => get()._decreasePlayerComponents("buildings"),
  decrementPlayerWorkers: () => get()._decreasePlayerComponents("workers"),

  // --- PRIVATE METHODS ---
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
});
