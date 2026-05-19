import { IMarketSlice, TMarketSliceCreator } from "./market.types";

export const createMarketSlice: TMarketSliceCreator<IMarketSlice> = (
  set,
  get,
) => ({
  availableMarket: [],
  market: [],
  selectedMarketItem: null,

  decreaseMarketItemQuantity: (name) => {
    set((state) => ({
      market: state.market.map((building) =>
        building.name === name
          ? { ...building, quantity: building.quantity - 1 }
          : building,
      ),
    }));
  },

  removeFromMarket: (name) => {
    set((state) => ({
      market: state.market.filter((building) => building.name !== name),
    }));
  },

  setAvailableMarket: (names) => {
    set({ availableMarket: names });
  },

  setMarket: (market) => {
    set({ market });
  },

  setSelectedMarketItem: (name) => {
    set({ selectedMarketItem: name });
  },
});
