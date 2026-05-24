import { expect, it } from "vitest";
import { createTestStore } from "./setup/create-test-store";

it("removeFromSupply()", () => {
  const store = createTestStore();

  store.getState().removeFromSupply({ stone: 2, coin: 10 });

  expect(store.getState().supplies).toEqual({
    stone: 13,
    wood: 15,
    wheat: 15,
    fish: 15,
    coin: 30,
  });
});
