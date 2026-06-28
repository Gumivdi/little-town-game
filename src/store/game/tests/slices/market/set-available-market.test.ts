import { expect, it } from "vitest";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("setAvailableMarket()", () => {
  const store = createGameTestStore();

  store.getState().setAvailableMarket([EBuildings.BAKERY, EBuildings.BARN]);

  expect(store.getState().availableMarket).toEqual([
    EBuildings.BAKERY,
    EBuildings.BARN,
  ]);
});
