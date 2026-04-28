import { DBuildings, DBuildingsRecommended } from "@/data/buildings.data";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { IBuildingsSlice, TBuildingsSliceCreator } from "./buildings.types";

export const createBuildingsSlice: TBuildingsSliceCreator<IBuildingsSlice> = (
  set,
  get,
) => ({
  market: [],
  available: [],

  initRandom: () => {
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

  initRecommended: () => {
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

  updateBuilding: (name, partial) => {
    set((state) => ({
      market: state.market.map((building) =>
        building.name === name ? { ...building, ...partial } : building,
      ),
    }));
  },

  setAvailable: (names) => {
    set({ available: names });
  },
});
