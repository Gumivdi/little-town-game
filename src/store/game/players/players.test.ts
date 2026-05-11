import { create } from "zustand";
import { describe, expect, it } from "vitest";
import { IPlayersSlice } from "./players.types";
import { createPlayersSlice } from "./players.slice";
import { DPlayers } from "@/data/players.data";

const createTestStore = () =>
  create<IPlayersSlice>((...args) => ({
    ...createPlayersSlice(...args),
  }));

describe("PlayersSlice", () => {
  describe("setNextPlayer()", () => {
    it("should set next player", () => {
      const store = createTestStore();
      store.setState({
        players: DPlayers,
        currentPlayerIndex: 0,
      });

      store.getState().setNextPlayer();

      expect(store.getState().currentPlayerIndex).toBe(1);
    });

    it("should loop back to first player", () => {
      const store = createTestStore();
      store.setState({
        players: DPlayers,
        currentPlayerIndex: DPlayers.length - 1,
      });

      store.getState().setNextPlayer();

      expect(store.getState().currentPlayerIndex).toBe(0);
    });
  });

  it("updatePlayerResources()", () => {
    const store = createTestStore();
    store.setState({
      players: DPlayers,
      currentPlayerIndex: 0,
    });

    store.getState().updatePlayerResources(1, { stone: 5, wood: 2 });

    const updatedPlayer = store
      .getState()
      .players.find((player) => player.id === 1);

    expect(updatedPlayer).toBeDefined();
    expect(updatedPlayer?.resources.stone).toBe(5);
    expect(updatedPlayer?.resources.wood).toBe(2);
  });

  it("decrementPlayerWorkers()", () => {
    const store = createTestStore();
    store.setState({
      players: DPlayers,
      currentPlayerIndex: 0,
    });

    store.getState().decrementPlayerWorkers();

    const updatedPlayer =
      store.getState().players[store.getState().currentPlayerIndex];

    expect(updatedPlayer).toBeDefined();
    expect(updatedPlayer?.workers).toBe(-1);
  });

  it("decrementPlayerBuildings()", () => {
    const store = createTestStore();
    store.setState({
      players: DPlayers,
      currentPlayerIndex: 0,
    });

    store.getState().decrementPlayerBuildings();

    const updatedPlayer =
      store.getState().players[store.getState().currentPlayerIndex];

    expect(updatedPlayer).toBeDefined();
    expect(updatedPlayer?.buildings).toBe(-1);
  });
});
