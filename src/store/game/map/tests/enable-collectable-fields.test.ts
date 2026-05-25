import { expect, it } from "vitest";
import { getBuilding } from "@/shared/helpers/buildings/get-building";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { FORREST, POND, ROCKS } from "@/data/fields.data";
import { createTestStore } from "./setup/create-test-store";
import { createBuildArea } from "./setup/create-build-area";

it("enableCollectableFields()", () => {
  const store = createTestStore();
  store.setState({
    map: [
      [
        createBuildArea({ id: "0-0-3-3" }),
        createBuildArea({
          id: "0-1-3-3",
          owner: 1,
          building: getBuilding(EBuildings.QUARRY),
        }),
        createBuildArea({
          id: "0-2-3-3",
          owner: 2,
          building: getBuilding(EBuildings.STATUE),
        }),
      ],
      [
        { ...FORREST, id: "1-0-3-3" },
        createBuildArea({ id: "1-1-3-3" }),
        { ...ROCKS, id: "1-2-3-3" },
      ],
      [
        createBuildArea({
          id: "2-0-3-3  ",
          owner: 1,
          building: getBuilding(EBuildings.CASTLE),
        }),
        createBuildArea({ id: "2-1-3-3", owner: 2 }),
        { ...POND, id: "2-2-3-3" },
      ],
    ],
  });

  store.getState().enableCollectableFields("1-1-3-3");
  const { map } = store.getState();

  expect(map[0][0].disabled).toBe(true);
  expect(map[0][1].disabled).toBe(false);
  expect(map[0][2].disabled).toBe(true);

  expect(map[1][0].disabled).toBe(false);
  expect(map[1][1].disabled).toBe(true);
  expect(map[1][2].disabled).toBe(false);

  expect(map[2][0].disabled).toBe(true);
  expect(map[2][1].disabled).toBe(true);
  expect(map[2][2].disabled).toBe(false);
});
