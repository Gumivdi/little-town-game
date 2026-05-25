import { expect, it } from "vitest";
import { DBuildings } from "@/data/buildings.data";
import { createTestStore } from "./setup/create-test-store";

it("setMarket()", () => {
  const store = createTestStore();
  const buildings = DBuildings.slice(0, 5);

  store.getState().setMarket(buildings);

  expect(store.getState().market).toEqual(buildings);
});
