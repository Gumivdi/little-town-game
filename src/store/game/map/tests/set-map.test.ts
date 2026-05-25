import { expect, it } from "vitest";
import { TMap } from "@/shared/types/map.type";
import { ROCKS } from "@/data/fields.data";
import { createTestStore } from "./setup/create-test-store";
import { createBuildArea } from "./setup/create-build-area";

it("setMap()", () => {
  const store = createTestStore();
  const newMap: TMap = [
    [createBuildArea({ id: "0-0-1-2", owner: 1 }), { ...ROCKS, id: "0-1-1-2" }],
  ];

  store.getState().setMap(newMap);

  expect(store.getState().map).toEqual(newMap);
});
