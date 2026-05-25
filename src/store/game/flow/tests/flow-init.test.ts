import { describe, expect, it } from "vitest";
import { EStatus } from "@/shared/enums/status.enum";
import { createTestStore } from "./setup/create-test-store";

describe("Flow Initialization", () => {
  it(`should have initial status as "${EStatus.SELECT_ACTION}"`, () => {
    const store = createTestStore();
    expect(store.getState().gameStatus).toBe(EStatus.SELECT_ACTION);
  });

  it("should have initial round as 1", () => {
    const store = createTestStore();
    expect(store.getState().round).toBe(1);
  });
});
