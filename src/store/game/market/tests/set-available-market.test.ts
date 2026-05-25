import { expect, it } from "vitest";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { createTestStore } from "./setup/create-test-store";

it("setAvailableMarket()", () => {
  const store = createTestStore();

  store.getState().setAvailableMarket([EBuildings.BAKERY, EBuildings.BARN]);

  expect(store.getState().availableMarket).toEqual([
    EBuildings.BAKERY,
    EBuildings.BARN,
  ]);
});
