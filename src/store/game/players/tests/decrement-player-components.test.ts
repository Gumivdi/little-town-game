import { describe, expect, it } from "vitest";
import { DPlayers } from "@/data/players.data";
import { createTestStore } from "./setup/create-test-store";

describe("decreasePlayerComponents()", () => {
  it("decrementPlayerBuildings()", () => {
    const store = createTestStore();
    store.setState({
      players: DPlayers,
      currentPlayerIndex: 0,
    });

    store.getState().decrementPlayerBuildings();
    const { players, currentPlayerIndex } = store.getState();

    expect(players[currentPlayerIndex]).toBeDefined();
    expect(players[currentPlayerIndex]?.buildings).toBe(-1);
  });

  it("decrementPlayerWorkers()", () => {
    const store = createTestStore();
    store.setState({
      players: DPlayers,
      currentPlayerIndex: 0,
    });

    store.getState().decrementPlayerWorkers();
    const { players, currentPlayerIndex } = store.getState();

    expect(players[currentPlayerIndex]).toBeDefined();
    expect(players[currentPlayerIndex]?.workers).toBe(-1);
  });
});
