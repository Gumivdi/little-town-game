import { expect, it } from "vitest";
import { createTestStore } from "./setup/create-test-store";

it("nextRound()", () => {
  const store = createTestStore();

  store.getState().nextRound();

  expect(store.getState().round).toBe(2);
});
