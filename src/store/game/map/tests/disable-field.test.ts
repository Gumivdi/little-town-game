import { expect, it } from "vitest";
import { ROCKS } from "@/data/fields.data";
import { createTestStore } from "./setup/create-test-store";

it("disableField()", () => {
  const store = createTestStore();
  store.setState({
    map: [[{ ...ROCKS, id: "0-0-1-1", disabled: false }]],
  });

  store.getState().disableField("0-0-1-1");

  expect(store.getState().map[0][0].disabled).toBe(true);
});
