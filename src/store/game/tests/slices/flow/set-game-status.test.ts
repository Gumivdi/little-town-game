import { expect, it } from "vitest";
import { EGameStatus } from "@/shared/enums/game-status.enum";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("setGameStatus()", () => {
  const store = createGameTestStore();

  store.getState().setGameStatus(EGameStatus.COLLECT);

  expect(store.getState().gameStatus).toBe(EGameStatus.COLLECT);
});
