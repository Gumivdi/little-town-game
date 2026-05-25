import { create } from "zustand";
import { createPlayersSlice, IPlayersSlice } from "../..";

export const createTestStore = () =>
  create<IPlayersSlice>((...args) => ({
    ...createPlayersSlice(...args),
  }));
