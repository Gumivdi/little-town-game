import { create } from 'zustand';
import { createMapSlice, IMapSlice } from './map';
import { createPlayersSlice, IPlayersSlice } from './players';

export type TGameStore = IMapSlice & IPlayersSlice;

const useGameStore = create<TGameStore>()((...a) => ({
  ...createMapSlice(...a),
  ...createPlayersSlice(...a),
}));