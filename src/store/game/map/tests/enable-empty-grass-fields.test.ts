import { expect, it } from "vitest";
import { createTestStore } from "./setup/create-test-store";
import { createBuildArea } from "./setup/create-build-area";

it("enableEmptyGrassFields()", () => {
  const store = createTestStore();
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
