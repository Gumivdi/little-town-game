import { create } from "zustand";
import { createMapSlice, IMapSlice } from "../..";

export const createTestStore = () =>
  create<IMapSlice>((...args) => ({
    ...createMapSlice(...args),
  }));
