import { expect, it } from "vitest";
import { createTestStore } from "./setup/create-test-store";

it("setMemorizedFieldId()", () => {
  const store = createTestStore();

  store.getState().setMemorizedFieldId("0-0-0-0");

  expect(store.getState().memorizedFieldId).toBe("0-0-0-0");
});
