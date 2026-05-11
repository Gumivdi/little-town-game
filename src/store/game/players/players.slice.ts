import { TResourcesAll } from "@/shared/types/resources.type";
import { IPlayersSlice, TPlayersSliceCreator } from "./players.types";
import { HDeepMerge } from "@/store/helpers";

export const createPlayersSlice: TPlayersSliceCreator<IPlayersSlice> = (
  set,
  get,
) => ({
  players: [],
  currentPlayerIndex: 0,

  _decreasePlayerComponents: (component) => {
    set((state) => {
      const currentPlayer = state.players[state.currentPlayerIndex];
      const updatedPlayer = {
        ...currentPlayer,
        [component]: currentPlayer[component] - 1,
      };
      const players = [...state.players];
      players[state.currentPlayerIndex] = updatedPlayer;
      return { players };
    });
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
    set((state) => {
      const players = [...state.players];
      const index = players.findIndex((item) => item.id === id);
      if (index === -1) return state;

      const updatedResources = <TResourcesAll>(
        HDeepMerge(state.players[index].resources, data)
      );
      const updatedPlayer = {
        ...state.players[index],
        resources: updatedResources,
      };
      players[index] = updatedPlayer;
      return { players };
    });
  },

  decrementPlayerWorkers: () => {
    get()._decreasePlayerComponents("workers");
  },

  decrementPlayerBuildings: () => {
    get()._decreasePlayerComponents("buildings");
  },
});
