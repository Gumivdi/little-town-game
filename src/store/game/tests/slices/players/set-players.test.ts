import { expect, it } from "vitest";
import { DPlayers } from "@/data/players.data";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("setPlayers()", () => {
  const store = createGameTestStore();
  store.setState({
    players: [],
    currentPlayerIndex: 0,
  });

  store.getState().setPlayers(DPlayers);

  expect(store.getState().players).toEqual(DPlayers);
});
