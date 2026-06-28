import { expect, it } from "vitest";
import { DPlayers } from "@/data/players.data";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("setPlayerResources()", () => {
  const store = createGameTestStore();
  store.setState({
    players: DPlayers,
    currentPlayerIndex: 0,
  });

  store.getState().setPlayerResources(1, { stone: 5, wood: 2 });
  const updatedPlayer = store
    .getState()
    .players.find((player) => player.id === 1);

  expect(updatedPlayer).toBeDefined();
  expect(updatedPlayer?.resources.stone).toBe(5);
  expect(updatedPlayer?.resources.wood).toBe(2);
});
