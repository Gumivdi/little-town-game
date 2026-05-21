import { create } from "zustand";
import { IMapSlice } from "../../map.types";
import { createMapSlice } from "../../map.slice";

export const createTestStore = () =>
  create<IMapSlice>((...args) => ({
    ...createMapSlice(...args),
  }));
