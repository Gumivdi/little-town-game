import { expect, it } from "vitest";
import { createBuildArea } from "@/store/game/tests/slices/map/setup/create-build-area";
import { EGameStatus } from "@/shared/enums/game-status.enum";
import { createGameTestStore } from "@/store/game/tests/setup/create-game-test-store";

it("grabWorker()", () => {
  const store = createGameTestStore();

  store.getState().setMap([
    [
      createBuildArea({
        id: "0-0-1-3",
        disabled: true,
      }),
      createBuildArea({
        id: "0-1-1-3",
        disabled: true,
      }),
      createBuildArea({
        id: "0-2-1-3",
        disabled: true,
      }),
    ],
  ]);

  store.getState().grabWorker();

  const state = store.getState();
  expect(state.map[0][0].disabled).toBe(false);
  expect(state.map[0][1].disabled).toBe(false);
  expect(state.map[0][2].disabled).toBe(false);
  expect(state.gameStatus).toBe(EGameStatus.SEND_WORKER);
});
