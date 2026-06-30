import { expect, it } from "vitest";
import { createBuildArea } from "./setup/create-build-area";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("enableEmptyGrassFields()", () => {
  const store = createGameTestStore();

  store.setState({
    map: [
      [
        createBuildArea({
          id: "0-0-1-3",
          disabled: true,
        }),
        createBuildArea({
          id: "0-1-1-3",
          disabled: true,
        }),
        createBuildArea({
          id: "0-2-1-3",
          disabled: true,
        }),
      ],
    ],
  });

  store.getState().enableEmptyGrassFields();

  expect(store.getState().map[0][0].disabled).toBe(false);
  expect(store.getState().map[0][1].disabled).toBe(false);
  expect(store.getState().map[0][2].disabled).toBe(false);
});
