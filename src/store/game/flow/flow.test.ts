import { create } from "zustand";
import { describe, expect, it } from "vitest";
import { EStatus } from "@/shared/enums/status.enum";
import { createFlowSlice } from "./flow.slice";
import { IFlowSlice } from "./flow.types";

const createTestStore = () =>
  create<IFlowSlice>((...args) => ({
    ...createFlowSlice(...args),
  }));

describe("FlowSlice", () => {
  it(`should have initial status as "${EStatus.SELECT_ACTION}"`, () => {
    const store = createTestStore();
    const { status } = store.getState();
    expect(status).toBe(EStatus.SELECT_ACTION);
  });

  it("should have initial round as 1", () => {
    const store = createTestStore();
    const { round } = store.getState();
    expect(round).toBe(1);
  });

  describe("setStatus()", () => {
    it("should update status when setStatus is called", () => {
      const store = createTestStore();
      const { setStatus } = store.getState();
      setStatus(EStatus.COLLECT);
      const { status } = store.getState();
      expect(status).toBe(EStatus.COLLECT);
    });
  });

  describe("nextRound()", () => {
    it("should update round when nextRound is called", () => {
      const store = createTestStore();
      const { nextRound } = store.getState();
      nextRound();
      const { round } = store.getState();
      expect(round).toBe(2);
    });
  });
});
