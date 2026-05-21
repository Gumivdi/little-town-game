import { create } from "zustand";
import { createMarketSlice, IMarketSlice } from "../..";

export const createTestStore = () =>
  create<IMarketSlice>((...args) => ({
    ...createMarketSlice(...args),
  }));
