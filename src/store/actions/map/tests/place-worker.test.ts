import { expect, it } from "vitest";
import { createBuildArea } from "@/store/game/map/tests/setup/create-build-area";
import { FORREST, POND, ROCKS } from "@/data/fields.data";
import { DPlayers } from "@/data/players.data";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { getBuilding } from "@/shared/helpers/buildings/get-building";
import { createGameTestStore } from "@/store/game/tests/setup/create-game-test-store";
import { TMap } from "@/shared/types/map.type";

it("placeWorker()", () => {
  const store = createGameTestStore();
  const selectedFieldId = "1-1-3-3";

  const generatePlayers = () =>
    DPlayers.map((player) => ({
      ...player,
      workers: 3,
    }));

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

  store.getState().setPlayers(generatePlayers());
  store.getState().setMap(generateMap());
  store.getState().placeWorker(selectedFieldId);

  const state = store.getState();

  expect(state.map[0][0].disabled).toBe(true);
  expect(state.map[0][1].disabled).toBe(false);
  expect(state.map[0][2].disabled).toBe(true);
  expect(state.map[1][0].disabled).toBe(false);
  expect(state.map[1][1].disabled).toBe(true);
  expect(state.map[1][2].disabled).toBe(false);
  expect(state.map[2][0].disabled).toBe(true);
  expect(state.map[2][1].disabled).toBe(true);
  expect(state.map[2][2].disabled).toBe(false);

  expect(state.getCurrentPlayer().workers).toBe(2);
});
