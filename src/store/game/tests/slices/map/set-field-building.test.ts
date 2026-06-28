import { expect, it } from "vitest";
import { getBuilding } from "@/shared/helpers/buildings/get-building";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { TBuildArea } from "@/shared/types/map.type";
import { createBuildArea } from "./setup/create-build-area";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("setFieldBuilding()", () => {
  const store = createGameTestStore();
  store.setState({
    map: [[createBuildArea({ id: "0-0-1-1" })]],
  });

  store.getState().setFieldBuilding("0-0-1-1", getBuilding(EBuildings.QUARRY)!);

  expect((store.getState().map[0][0] as TBuildArea).building).toEqual(
    getBuilding(EBuildings.QUARRY),
  );
});
