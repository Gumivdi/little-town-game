import { create } from 'zustand';
import { createMapSlice, IMapSlice } from './map';

export type TGameStore = IMapSlice;

const useGameStore = create<TGameStore>()((...a) => ({
  ...createMapSlice(...a),
}));