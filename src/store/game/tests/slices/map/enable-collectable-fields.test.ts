import { expect, it } from "vitest";
import { getBuilding } from "@/shared/helpers/buildings/get-building";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { TMap } from "@/shared/types/map.type";
import { FORREST, POND, ROCKS } from "@/data/fields.data";
import { createBuildArea } from "./setup/create-build-area";
import { createGameTestStore } from "../../setup/create-game-test-store";

const generateMap = (): TMap => [
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
];

it("enableCollectableFields()", () => {
  const store = createGameTestStore();
  store.setState({
    map: generateMap(),
  });

  store.getState().enableCollectableFields("1-1-3-3");

  const state = store.getState();
  const expectations = [
    { row: 0, col: 0, expected: true },
    { row: 0, col: 1, expected: false },
    { row: 0, col: 2, expected: true },
    { row: 1, col: 0, expected: false },
    { row: 1, col: 1, expected: true },
    { row: 1, col: 2, expected: false },
    { row: 2, col: 0, expected: true },
    { row: 2, col: 1, expected: true },
    { row: 2, col: 2, expected: false },
  ];

  expectations.forEach(({ row, col, expected }) => {
    expect(state.map[row][col].disabled).toBe(expected);
  });
});
