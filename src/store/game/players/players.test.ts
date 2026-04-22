import { create } from "zustand"
import { describe, expect, it } from "vitest"
import { IPlayersSlice } from "./players.types"
import { createPlayersSlice } from "./players.slice"
import { DPlayers } from "@/data/players.data"

const createTestStore = () => 
  create<IPlayersSlice>((...args) => ({
    ...createPlayersSlice(...args),
  }))


describe("PlayersSlice", () => {
  describe("setNextPlayer()", () => {
    it("should set next player", () => {
      const store = createTestStore();
      store.setState({
        players: DPlayers,
        currentPlayer: 0,
      });

      store.getState().setNextPlayer();
      expect(store.getState().currentPlayer).toBe(1);
    });

    it("should loop back to first player", () => {
      const store = createTestStore();
      store.setState({
        players: DPlayers,
        currentPlayer: DPlayers.length - 1,
      });

      store.getState().setNextPlayer();
      expect(store.getState().currentPlayer).toBe(0);
    });
  });

  describe("updatePlayer()", () => {
    it("should update player data", () => {
      const store = createTestStore();
      store.setState({
        players: DPlayers,
        currentPlayer: 0,
      });

      store.getState().updatePlayer(1, { name: "Gimmy Updated", resources: { stone: 5, wood: 2 } });
      const updatedPlayer = store.getState().players.find(player => player.id === 1);
      expect(updatedPlayer).toBeDefined();
      expect(updatedPlayer?.name).toBe("Gimmy Updated");
      expect(updatedPlayer?.resources.stone).toBe(5);
      expect(updatedPlayer?.resources.wood).toBe(2);
    });
  });
});