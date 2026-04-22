import { create } from 'zustand';
import { createMapSlice, IMapSlice } from './map';
import { createPlayersSlice, IPlayersSlice } from './players';
import { createSupplySlice, ISupplySlice } from './supply';

export type TGameStore = IMapSlice & IPlayersSlice & ISupplySlice;

const useGameStore = create<TGameStore>()((...a) => ({
  ...createMapSlice(...a),
  ...createPlayersSlice(...a),
  ...createSupplySlice(...a),
}));