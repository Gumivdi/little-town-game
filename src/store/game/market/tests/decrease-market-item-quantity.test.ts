import { describe, expect, it } from "vitest";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { getBuilding } from "@/shared/helpers/buildings/get-building";
import { createTestStore } from "./setup/create-test-store";

describe("removeFromMarket()", () => {
  it("should remove building from the market", () => {
    const store = createTestStore();
    store.setState({
      market: [
        getBuilding(EBuildings.WHEAT_FIELD),
        getBuilding(EBuildings.BAKERY),
      ],
    });

    store.getState().removeFromMarket(EBuildings.WHEAT_FIELD);

    expect(store.getState().market.length).toBe(1);
    expect(store.getState().market[0].name).toBe(EBuildings.BAKERY);
  });

  it("should do nothing if the building isn't available in the market", () => {
    const store = createTestStore();
    store.setState({
      market: [getBuilding(EBuildings.WHEAT_FIELD)],
    });

    store.getState().removeFromMarket(EBuildings.BAKERY);

    expect(store.getState().market.length).toBe(1);
    expect(store.getState().market[0].name).toBe(EBuildings.WHEAT_FIELD);
  });
});
