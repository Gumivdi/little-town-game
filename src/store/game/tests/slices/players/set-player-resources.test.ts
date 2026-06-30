import { expect, it } from "vitest";
import { DPlayers } from "@/data/players.data";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("setPlayerResources()", () => {
  const store = createGameTestStore();
  store.setState({
    currentPlayerIndex: 0,
    players: DPlayers,
  });

  store.getState().setPlayerResources(1, { stone: 5, wood: 2 });

  const player = store.getState().getCurrentPlayer();
  expect(player).toBeDefined();
  expect(player?.resources.stone).toBe(5);
  expect(player?.resources.wood).toBe(2);
});
