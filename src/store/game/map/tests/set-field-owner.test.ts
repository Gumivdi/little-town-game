import { expect, it } from "vitest";
import { TBuildArea } from "@/shared/types/map.type";
import { createTestStore } from "./setup/create-test-store";
import { createBuildArea } from "./setup/create-build-area";

it("setFieldOwner()", () => {
  const store = createTestStore();
  store.setState({
    map: [[createBuildArea({ id: "0-0-1-1" })]],
  });

  store.getState().setFieldOwner("0-0-1-1", 1);

  expect((store.getState().map[0][0] as TBuildArea).owner).toBe(1);
});
