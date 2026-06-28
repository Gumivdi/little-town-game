import { expect, it } from "vitest";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("addToSupply()", () => {
  const store = createGameTestStore();

  store.getState().addToSupply({ stone: 5, wood: 3 });

  expect(store.getState().supplies).toEqual({
    stone: 20,
    wood: 18,
    wheat: 15,
    fish: 15,
    coin: 40,
  });
});
