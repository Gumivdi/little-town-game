import { expect, it } from "vitest";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("setMemorizedFieldId()", () => {
  const store = createGameTestStore();

  store.getState().setMemorizedFieldId("0-0-0-0");

  expect(store.getState().memorizedFieldId).toBe("0-0-0-0");
});
