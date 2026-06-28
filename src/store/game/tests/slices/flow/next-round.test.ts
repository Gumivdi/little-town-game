import { expect, it } from "vitest";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("nextRound()", () => {
  const store = createGameTestStore();

  store.getState().nextRound();

  expect(store.getState().round).toBe(2);
});
