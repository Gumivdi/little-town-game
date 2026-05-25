import { expect, it } from "vitest";
import { EStatus } from "@/shared/enums/status.enum";
import { createTestStore } from "./setup/create-test-store";

it("setGameStatus()", () => {
  const store = createTestStore();

  store.getState().setGameStatus(EStatus.COLLECT);

  expect(store.getState().gameStatus).toBe(EStatus.COLLECT);
});
