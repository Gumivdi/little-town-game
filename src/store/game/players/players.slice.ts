import { IPlayersSlice, TPlayersSliceCreator } from "./players.types";
import { HDeepMerge } from "@/store/helpers";

export const createPlayersSlice: TPlayersSliceCreator<IPlayersSlice> = (set, get) => ({
  players: [],
  currentPlayer: 0,

  setNextPlayer: () => {
    const isLastPlayer =  get().currentPlayer === get().players.length - 1;
    const nextPlayer = isLastPlayer ? 0 : get().currentPlayer + 1;
    set({ currentPlayer: nextPlayer})
  },

  updatePlayer: (id, data) => {
    set(state => {
      const index = state.players.findIndex(item => item.id === id);
      if (index === -1) return state;

      const updated = HDeepMerge(state.players[index], data);
      const players = [...state.players];
      players[index] = updated;

      return { players }
    })
  }
});