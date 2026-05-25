import { expect, it } from "vitest";
import { createTestStore } from "./setup/create-test-store";

it("addToSupply()", () => {
  const store = createTestStore();

  store.getState().addToSupply({ stone: 5, wood: 3 });

  expect(store.getState().supplies).toEqual({
    stone: 20,
    wood: 18,
    wheat: 15,
    fish: 15,
    coin: 40,
  });
});
