import { describe, expect, it } from "vitest";
import { EGameStatus } from "@/shared/enums/game-status.enum";
import { createGameTestStore } from "../../setup/create-game-test-store";

describe("Flow Initialization", () => {
  it(`should have initial status as "${EGameStatus.SELECT_ACTION}"`, () => {
    const store = createGameTestStore();
    expect(store.getState().gameStatus).toBe(EGameStatus.SELECT_ACTION);
  });

  it("should have initial round as 1", () => {
    const store = createGameTestStore();
    expect(store.getState().round).toBe(1);
  });
});
