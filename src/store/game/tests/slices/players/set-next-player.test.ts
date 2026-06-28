import { describe, expect, it } from "vitest";
import { DPlayers } from "@/data/players.data";
import { createGameTestStore } from "../../setup/create-game-test-store";

describe("setNextPlayer()", () => {
  it("should set next player", () => {
    const store = createGameTestStore();
    store.setState({
      players: DPlayers,
      currentPlayerIndex: 0,
    });

    store.getState().setNextPlayer();

    expect(store.getState().currentPlayerIndex).toBe(1);
  });

  it("should loop back to first player", () => {
    const store = createGameTestStore();
    store.setState({
      players: DPlayers,
      currentPlayerIndex: DPlayers.length - 1,
    });

    store.getState().setNextPlayer();

    expect(store.getState().currentPlayerIndex).toBe(0);
  });
});
