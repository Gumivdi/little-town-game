import { expect, it } from "vitest";
import { FORREST, ROCKS } from "@/data/fields.data";
import { createTestStore } from "./setup/create-test-store";

it("disableFields()", () => {
  const store = createTestStore();
  store.setState({
    map: [
      [
        { ...ROCKS, id: "0-0-1-2", disabled: false },
        { ...FORREST, id: "0-1-1-2", disabled: false },
      ],
    ],
  });

  store.getState().disableFields();

  expect(store.getState().map[0][0].disabled).toBe(true);
  expect(store.getState().map[0][1].disabled).toBe(true);
});
