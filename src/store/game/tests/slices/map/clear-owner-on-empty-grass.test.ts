import { expect, it } from "vitest";
import { ROCKS } from "@/data/fields.data";
import { DBuildings } from "@/data/buildings.data";
import { TBuildArea } from "@/shared/types/map.type";
import { createBuildArea } from "./setup/create-build-area";
import { createGameTestStore } from "../../setup/create-game-test-store";

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

  expect((store.getState().map[0][1] as TBuildArea).owner).toBeNull();
  expect((store.getState().map[0][2] as TBuildArea).owner).toBe(1);
});
