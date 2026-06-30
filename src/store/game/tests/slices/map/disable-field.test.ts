import { expect, it } from "vitest";
import { ROCKS } from "@/data/fields.data";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("disableField()", () => {
  const store = createGameTestStore();
  store.setState({
    map: [[{ ...ROCKS, id: "0-0-1-1", disabled: false }]],
  });

  store.getState().disableField("0-0-1-1");

  expect(store.getState().map[0][0].disabled).toBe(true);
});
