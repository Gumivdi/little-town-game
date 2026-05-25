import { create } from "zustand";
import { createFlowSlice, IFlowSlice } from "../..";

export const createTestStore = () =>
  create<IFlowSlice>((...args) => ({
    ...createFlowSlice(...args),
  }));
