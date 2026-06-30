import { expect, it } from "vitest";
import { ROCKS } from "@/data/fields.data";
import { DBuildings } from "@/data/buildings.data";
import { createGameTestStore } from "../../setup/create-game-test-store";
import { assertBuildArea } from "./helpers/assert-build-area";
import { createBuildArea } from "./setup/create-build-area";

it("clearOwnersOnEmptyGrass()", () => {
  const store = createGameTestStore();
  store.setState({
    map: [
      [
        { ...ROCKS, id: "0-0-1-3" },
        createBuildArea({ id: "0-1-1-3", owner: 1 }),
        createBuildArea({
          id: "0-2-1-3",
          owner: 1,
          building: DBuildings[0],
        }),
      ],
    ],
  });

  store.getState().clearOwnersOnEmptyGrass();

  const state = store.getState();

  const expectations = [
    { field: state.map[0][1], expectedOwner: null },
    { field: state.map[0][2], expectedOwner: 1 },
  ];

  expectations.forEach(({ field, expectedOwner }) => {
    const buildArea = assertBuildArea(field);
    expect(buildArea.owner).toBe(expectedOwner);
  });
});
