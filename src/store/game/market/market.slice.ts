import { DBuildings, DBuildingsRecommended } from "@/data/buildings.data";
import { EBuildings } from "@/shared/enums/buildings.enum";
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

  initRandomMarket: () => {
    const wheatField = DBuildings.find(
      (building) => building.name === EBuildings.WHEAT_FIELD,
    )!;
    const allBuildings = DBuildings.filter(
      (building) => building.name !== EBuildings.WHEAT_FIELD,
    );
    const randomBuildings = allBuildings
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);

    set({ market: [wheatField, ...randomBuildings] });
  },

  initRecommendedMarket: () => {
    const wheatField = DBuildings.find(
      (building) => building.name === EBuildings.WHEAT_FIELD,
    )!;
    const allBuildings = DBuildings.filter(
      (building) => building.name !== EBuildings.WHEAT_FIELD,
    );
    const recommendedBuildings = allBuildings.filter((building) =>
      DBuildingsRecommended.includes(building.name),
    );

    set({ market: [wheatField, ...recommendedBuildings] });
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
