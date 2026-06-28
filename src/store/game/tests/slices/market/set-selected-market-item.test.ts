import { expect, it } from "vitest";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("setSelectedMarketItem()", () => {
  const store = createGameTestStore();

  store.getState().setSelectedMarketItem(EBuildings.BAKERY);

  expect(store.getState().selectedMarketItem).toEqual(EBuildings.BAKERY);
});
