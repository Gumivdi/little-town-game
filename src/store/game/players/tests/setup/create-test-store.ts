import { create } from "zustand";
import { IPlayersSlice } from "../../players.types";
import { createPlayersSlice } from "../..";

export const createTestStore = () =>
  create<IPlayersSlice>((...args) => ({
    ...createPlayersSlice(...args),
  }));
