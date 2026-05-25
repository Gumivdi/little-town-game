import { expect, it } from "vitest";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { createTestStore } from "./setup/create-test-store";

it("setSelectedMarketItem()", () => {
  const store = createTestStore();

  store.getState().setSelectedMarketItem(EBuildings.BAKERY);

  expect(store.getState().selectedMarketItem).toEqual(EBuildings.BAKERY);
});
