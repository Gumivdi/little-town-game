import { expect, it } from "vitest";
import { DBuildings } from "@/data/buildings.data";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("setMarket()", () => {
  const store = createGameTestStore();
  const buildings = DBuildings.slice(0, 5);

  store.getState().setMarket(buildings);

  expect(store.getState().market).toEqual(buildings);
});
