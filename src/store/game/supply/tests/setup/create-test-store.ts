import { create } from "zustand";
import { createSupplySlice, ISupplySlice } from "../..";

export const createTestStore = () =>
  create<ISupplySlice>((...args) => ({
    ...createSupplySlice(...args),
  }));
