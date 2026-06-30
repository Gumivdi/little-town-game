import { expect, it } from "vitest";
import { createBuildArea } from "./setup/create-build-area";
import { createGameTestStore } from "../../setup/create-game-test-store";
import { assertBuildArea } from "./helpers/assert-build-area";

it("setFieldOwner()", () => {
  const store = createGameTestStore();
  store.setState({
    map: [[createBuildArea({ id: "0-0-1-1" })]],
  });

  store.getState().setFieldOwner("0-0-1-1", 1);

  const field = assertBuildArea(store.getState().map[0][0]);

  expect(field.owner).toBe(1);
});
