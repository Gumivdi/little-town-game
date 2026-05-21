import { create } from "zustand";
import { createToastSlice, IToastSlice } from "../..";

export const createTestStore = () =>
  create<IToastSlice>((...args) => ({
    ...createToastSlice(...args),
  }));
