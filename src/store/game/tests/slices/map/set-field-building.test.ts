import { expect, it } from "vitest";
import { getBuilding } from "@/shared/helpers/buildings/get-building";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { createBuildArea } from "./setup/create-build-area";
import { createGameTestStore } from "../../setup/create-game-test-store";
import { assertBuildArea } from "./helpers/assert-build-area";

it("setFieldBuilding()", () => {
  const store = createGameTestStore();
  store.setState({
    map: [[createBuildArea({ id: "0-0-1-1" })]],
  });

  store.getState().setFieldBuilding("0-0-1-1", getBuilding(EBuildings.QUARRY)!);

  const field = assertBuildArea(store.getState().map[0][0]);

  expect(field.building).toEqual(getBuilding(EBuildings.QUARRY));
});
